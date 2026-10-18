import { useCallback, useEffect, useRef, useState } from "react";
import { DRONE_FREQUENCY } from "@/lib/field-geometry";

type AudioRig = { context: AudioContext; master: GainNode; oscillator: OscillatorNode };

export function useFieldAudio() {
  const rig = useRef<AudioRig | null>(null);
  const enabledRef = useRef(false);
  const [enabled, setEnabled] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  const servo = useCallback(() => {
    const audio = rig.current;
    if (!audio || !enabledRef.current || audio.context.state !== "running") return;
    const now = audio.context.currentTime;
    const click = audio.context.createOscillator();
    const gain = audio.context.createGain();
    click.type = "triangle";
    click.frequency.setValueAtTime(180, now);
    click.frequency.exponentialRampToValueAtTime(65, now + 0.07);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.025, now + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);
    click.connect(gain);
    gain.connect(audio.context.destination);
    click.start(now);
    click.stop(now + 0.1);
    click.onended = () => { click.disconnect(); gain.disconnect(); };
  }, []);

  const toggle = useCallback(async () => {
    try {
      if (enabledRef.current) {
        servo();
        enabledRef.current = false;
        setEnabled(false);
        const audio = rig.current;
        if (audio) {
          audio.master.gain.cancelScheduledValues(audio.context.currentTime);
          audio.master.gain.setTargetAtTime(0, audio.context.currentTime, 0.08);
          await audio.context.suspend();
        }
        return;
      }
      if (!rig.current) {
        if (!window.AudioContext) { setUnavailable(true); return; }
        const context = new AudioContext();
        const master = context.createGain();
        const oscillator = context.createOscillator();
        master.gain.value = 0;
        oscillator.type = "sine";
        oscillator.frequency.value = DRONE_FREQUENCY;
        oscillator.connect(master);
        master.connect(context.destination);
        oscillator.start();
        rig.current = { context, master, oscillator };
      }
      const audio = rig.current;
      await audio.context.resume();
      audio.master.gain.setTargetAtTime(0.045, audio.context.currentTime, 0.3);
      enabledRef.current = true;
      setEnabled(true);
      servo();
    } catch {
      enabledRef.current = false;
      setEnabled(false);
      setUnavailable(true);
    }
  }, [servo]);

  useEffect(() => {
    const visibility = () => {
      const audio = rig.current;
      if (!audio) return;
      if (document.hidden) void audio.context.suspend().catch(() => {});
      else if (enabledRef.current) void audio.context.resume().catch(() => {});
    };
    document.addEventListener("visibilitychange", visibility);
    return () => {
      document.removeEventListener("visibilitychange", visibility);
      const audio = rig.current;
      rig.current = null;
      if (audio) { audio.oscillator.stop(); void audio.context.close().catch(() => {}); }
    };
  }, []);

  return { enabled, unavailable, toggle, servo };
}