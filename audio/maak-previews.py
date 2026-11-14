import sys, wave, glob, os, re, subprocess
src_dir, tmp_dir, out_dir = sys.argv[1:4]
LENGTH, FADE_IN, FADE_OUT = 45.0, 0.5, 3.0
STARTS = {"02": 120.0, "04": 185.0}  # startpunt in seconden per nummer; de rest begint op 0:30
for path in sorted(glob.glob(os.path.join(src_dir, "*.wav"))):
    m = re.match(r"(\d\d)_Best Parts_(.+?) - \[", os.path.basename(path))
    num, title = m.group(1), m.group(2)
    if len(sys.argv) > 4 and num not in sys.argv[4:]: continue
    START = STARTS.get(num, 30.0)
    slug = re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")
    with wave.open(path, "rb") as w:
        ch, sw, sr = w.getnchannels(), w.getsampwidth(), w.getframerate()
        w.setpos(int(START * sr))
        data = bytearray(w.readframes(int(LENGTH * sr)))
    fs = ch * sw
    n = len(data) // fs
    def scale(frame, g):
        for c in range(ch):
            o = frame * fs + c * sw
            v = int.from_bytes(data[o:o+sw], "little", signed=True)
            data[o:o+sw] = int(v * g).to_bytes(sw, "little", signed=True)
    fi, fo = int(FADE_IN * sr), int(FADE_OUT * sr)
    for i in range(fi): scale(i, (i / fi) ** 2)
    for i in range(fo): scale(n - 1 - i, (i / fo) ** 2)
    tmp = os.path.join(tmp_dir, f"{num}.wav")
    with wave.open(tmp, "wb") as o:
        o.setnchannels(ch); o.setsampwidth(sw); o.setframerate(sr); o.writeframes(bytes(data))
    out = os.path.join(out_dir, f"preview-{num}-{slug}.m4a")
    subprocess.run(["afconvert", "-f", "m4af", "-d", "aac", "-b", "128000", "-q", "127", "-s", "0", tmp, out], check=True)
    os.remove(tmp)
    print(out, os.path.getsize(out) // 1024, "KB")
