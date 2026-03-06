export const speak = (t: string, setVoiceOn: any) => {
    if (!t.trim()) return
    const s = window.speechSynthesis
    const v = s.getVoices()

    const voice =
        v.find(a => a.name.toLowerCase().includes("female")) ||
        v.find(a => a.name.includes("Zira")) ||
        v.find(a => a.name.includes("Samantha")) ||
        v.find(a => a.name.includes("Google UK English Female")) ||
        v.find(a => a.lang === "en-US") ||
        v[0]

    const u = new SpeechSynthesisUtterance(t)
    if (voice) u.voice = voice
    u.rate = 0.95
    u.pitch = 1;

    u.onstart = () => {
        setVoiceOn(true);
    };
    u.onend = () => {
        setVoiceOn(false);
    };
    u.onerror = () => {
        setVoiceOn(false);
    };

    s.speak(u)
}