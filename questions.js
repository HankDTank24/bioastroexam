// Bioastronautics quiz-prep site: 6 mini quizzes built around the 4 quiz topics:
//   Q1 CV system (multiple choice, simple calcs: vascular resistance, stroke volume,
//      cardiac output from HR×SV and from the Fick equation, ejection fraction)
//   Q2 Cross-bridge cycle
//   Q3 Muscle spindles (True/False + explain)
//   Q4 Countermeasures
//
// Question fields:
//   id, quiz (key into QUIZZES), q (HTML ok), opts, ans (0 = first option),
//   exp (explanation of the right answer), why (array: why each WRONG option is wrong; null for the right one),
//   tf: true for True/False questions (keeps True/False order and shows an "explain it" prompt)

const COURSE = {
  kicker: "UC Davis · Bioastronautics",
  title: "Quiz Prep: 6 Mini Quizzes",
  footer: "Calculations use the worked examples and numbers from the Cardiovascular System I & II slides. Cross-bridge and spindle questions follow Muscle Mechanics I; countermeasures come from the CV II, Muscle II, Bone, SANS and Artificial Gravity lectures."
};

const QUIZZES = [
  { id: "cv1", num: 1, title: "CV Calcs: Resistance & Cardiac Output", examQ: "Quiz Q1",
    desc: "R = ΔP/Q, CO = HR × SV, and the Fick equation, using the slide examples (90 → 5 mmHg, 5 L/min ≈ 83 cc/s, 1 PRU)." },
  { id: "cv2", num: 2, title: "CV Calcs: Stroke Volume, Ejection Fraction & PV Loops", examQ: "Quiz Q1",
    desc: "SV = EDV − ESV, EF = SV/EDV, reading the PV loop, contractility, preload/afterload, and P<sub>ms</sub>." },
  { id: "xb", num: 3, title: "The Cross-Bridge Cycle", examQ: "Quiz Q2",
    desc: "The 4 steps (formation, power stroke, detachment, reactivation), Ca²⁺/troponin/tropomyosin, and the role of ATP." },
  { id: "sp", num: 4, title: "Muscle Spindles: True / False + Explain", examQ: "Quiz Q3",
    desc: "Intrafusal vs extrafusal, α vs γ, Ia vs II, bag vs chain, α-γ coactivation, the stretch reflex. Explain each answer before you click." },
  { id: "cm", num: 5, title: "Countermeasures", examQ: "Quiz Q4",
    desc: "Cardiovascular (LBNP, G-suits, fluid loading, EPO…), muscle & bone (ARED, suits, bisphosphonates), SANS and artificial gravity." },
  { id: "mock", num: 6, title: "Mock Quiz: Mixed Review", examQ: "All 4",
    desc: "All four topics mixed, like the real quiz: two multi-step CV calcs, cross-bridge, spindle True/False, and countermeasures." }
];

const FORMULAS = [
  { name: "Vascular resistance", f: "R = ΔP / Q",
    ex: "Slide example: ΔP ≈ 90 − 5 = 85 mmHg, Q ≈ 5 L/min = 83 cc/s → R = 85/83 ≈ 1 mmHg·s/ml = <b>1 PRU</b>" },
  { name: "Cardiac output (HR × SV)", f: "CO = HR × SV",
    ex: "70 beats/min × 70 ml/beat = 4900 ml/min ≈ <b>5 L/min</b>" },
  { name: "Cardiac output (Fick)", f: "Q = V̇O₂ / (C<sub>A</sub>(O₂) − C<sub>V</sub>(O₂))",
    ex: "Units from the slide: C in ml O₂ per ml blood, V̇O₂ in ml O₂/min → Q in ml blood/min. 250 / (0.20 − 0.15) = <b>5000 ml/min</b>" },
  { name: "Stroke volume", f: "SV = EDV − ESV",
    ex: "The width of the PV loop. EDV 120 ml, ESV 50 ml → SV = <b>70 ml</b>" },
  { name: "Ejection fraction", f: "EF = SV / EDV",
    ex: "70 / 120 ≈ <b>58%</b>" },
  { name: "Ohm's law analog", f: "ΔP = TPR × CO",
    ex: "With TPR constant (no control), a 50% drop in CO → a 50% drop in perfusion pressure" },
  { name: "Mean systemic filling pressure", f: "P<sub>ms</sub> = (V<sub>t</sub> − V<sub>0</sub>) / C<sub>t</sub>",
    ex: "Supine: (5000 − 3900)/125 ≈ 8 mmHg. Standing: (5000 − 4500)/125 = <b>4 mmHg</b>" }
];

const QUESTIONS = [
/* ============ QUIZ 1 · CV CALCS: RESISTANCE & CARDIAC OUTPUT ============ */
{
  id: "cv1-1", quiz: "cv1",
  q: "From the slide: mean arterial pressure ≈ 90 mmHg, venous pressure ≈ 5 mmHg, and cardiac output ≈ 5 L/min. What is the total peripheral resistance?",
  opts: ["≈ 0.06 PRU", "≈ 1 PRU (mmHg·s/ml)", "≈ 17 PRU", "≈ 85 PRU", "≈ 18 PRU"],
  ans: 1,
  exp: "R = ΔP / Q. ΔP = 90 − 5 = <b>85 mmHg</b>. Q = 5 L/min = 5000 ml / 60 s ≈ <b>83 ml/s</b>. R = 85/83 ≈ <b>1 mmHg·s/ml = 1 PRU</b> (peripheral resistance unit).",
  why: ["0.06 is the VENOUS resistance R<sub>v</sub> in the lumped model, not total peripheral resistance.", null, "85/5 = 17 uses Q in L/min. That's 17 mmHg·min/L, which is still ≈ 1 PRU once converted, but it isn't in PRU.", "That's ΔP alone; you still need to divide by flow.", "That's 90/5, using arterial pressure instead of ΔP and Q in L/min."]
},
{
  id: "cv1-2", quiz: "cv1",
  q: "Which statement best defines <b>vascular resistance</b> as used in the course?",
  opts: ["The pressure in the arteries at the end of systole", "The ratio of the pressure drop across a vascular bed to the flow through it, R = ΔP/Q (the hydraulic analog of Ohm's law, R = V/I)", "The volume of blood pumped per beat", "The change in volume per change in pressure, ΔV/ΔP", "The oxygen extracted by the tissues"],
  ans: 1,
  exp: "<b>R = ΔP / Q</b>: the pressure difference needed to drive a given flow. The lecture uses the electrical analogy: ΔV = R·I ⇔ ΔP = TPR·CO. Units are mmHg·s/ml (PRU).",
  why: ["That's a pressure, not a resistance.", null, "That's stroke volume.", "That's compliance/capacitance, C = ΔV/ΔP.", "That's the arteriovenous O₂ difference used in the Fick equation."]
},
{
  id: "cv1-3", quiz: "cv1",
  q: "An astronaut at rest has a heart rate of 70 beats/min and a stroke volume of 70 ml. What is their cardiac output?",
  opts: ["1.0 L/min", "4.9 L/min", "49 L/min", "140 ml/min", "0.49 L/min"],
  ans: 1,
  exp: "CO = HR × SV = 70 beats/min × 70 ml/beat = 4900 ml/min = <b>4.9 L/min</b>, about the normal ~5 L/min.",
  why: ["HR/SV, not HR × SV.", null, "Unit slip: 4900 ml = 4.9 L, not 49 L.", "That's HR + SV.", "Off by 10×."]
},
{
  id: "cv1-4", quiz: "cv1",
  q: "During a stand test after flight, cardiac output is 6 L/min with a heart rate of 75 beats/min. What is the stroke volume?",
  opts: ["450 ml", "80 ml", "12.5 ml", "8 ml", "0.08 ml"],
  ans: 1,
  exp: "SV = CO / HR = 6000 ml/min ÷ 75 beats/min = <b>80 ml/beat</b>.",
  why: ["That's CO × HR (and in the wrong units).", null, "That's HR ÷ CO with CO in L/min.", "Off by 10×; check the division (6000/75 = 80).", "That's 6/75 left in L, then mislabeled as ml."]
},
{
  id: "cv1-5", quiz: "cv1",
  q: "Using the Fick method from lecture, find cardiac output: V̇O₂ = 250 ml O₂/min, arterial O₂ content C<sub>A</sub> = 0.20 ml O₂/ml blood, mixed venous O₂ content C<sub>V</sub> = 0.15 ml O₂/ml blood.",
  opts: ["12.5 ml/min", "5 L/min", "1.25 L/min", "714 ml/min", "50 L/min"],
  ans: 1,
  exp: "Conservation of mass: Q·C<sub>A</sub> = Q·C<sub>V</sub> + V̇O₂, so Q = V̇O₂ / (C<sub>A</sub> − C<sub>V</sub>) = 250 / (0.20 − 0.15) = 250 / 0.05 = <b>5000 ml/min = 5 L/min</b>.",
  why: ["That's 250 × 0.05: you multiplied instead of dividing.", null, "That's 250/0.20 = 1250 ml/min: you used only C<sub>A</sub>, not the a–v difference.", "That's 250/0.35: you added the contents instead of subtracting.", "Off by 10×; check the decimal (0.05, not 0.005)."]
},
{
  id: "cv1-6", quiz: "cv1",
  q: "During hard exercise on the cycle ergometer, V̇O₂ rises to 1500 ml O₂/min. Arterial O₂ content is 0.20 ml O₂/ml and venous O₂ content falls to 0.10 ml O₂/ml (the tissues extract more). What is the cardiac output?",
  opts: ["7.5 L/min", "15 L/min", "150 L/min", "5 L/min", "30 L/min"],
  ans: 1,
  exp: "Q = 1500 / (0.20 − 0.10) = 1500 / 0.10 = <b>15,000 ml/min = 15 L/min</b>. Both a bigger O₂ demand and a wider a–v difference show up in the Fick equation.",
  why: ["That's 1500/0.20: you used only C<sub>A</sub>.", null, "Off by 10×; check the decimal.", "That's resting output; exercise raises it.", "That's 1500/0.05; the a–v difference here is 0.10."]
},
{
  id: "cv1-7", quiz: "cv1",
  q: "Rearranging the Fick equation: if cardiac output is 5 L/min, V̇O₂ = 250 ml O₂/min, and C<sub>A</sub> = 0.20 ml O₂/ml, what is the mixed venous O₂ content C<sub>V</sub>?",
  opts: ["0.05 ml O₂/ml", "0.15 ml O₂/ml", "0.25 ml O₂/ml", "0.10 ml O₂/ml", "0.20 ml O₂/ml"],
  ans: 1,
  exp: "C<sub>A</sub> − C<sub>V</sub> = V̇O₂ / Q = 250 / 5000 = 0.05. So C<sub>V</sub> = 0.20 − 0.05 = <b>0.15 ml O₂/ml</b>.",
  why: ["That's the a–v DIFFERENCE, not C<sub>V</sub>.", null, "C<sub>V</sub> can't exceed C<sub>A</sub>: tissues remove O₂, they don't add it.", "That would require Q = 2.5 L/min.", "That would mean zero O₂ extraction (infinite Q)."]
},
{
  id: "cv1-8", quiz: "cv1",
  q: "Arterial O₂ content is often reported per 100 ml (dl) of blood. If C<sub>A</sub> = 19 ml O₂/dl, C<sub>V</sub> = 14 ml O₂/dl, and V̇O₂ = 250 ml O₂/min, what is the cardiac output?",
  opts: ["50 ml/min", "5 L/min", "50 L/min", "0.5 L/min", "13 L/min"],
  ans: 1,
  exp: "Convert to the slide's units (ml O₂ per ml blood): 19 ml/dl = 0.19 and 14 ml/dl = 0.14, so the difference is 0.05 ml O₂/ml. Q = 250 / 0.05 = <b>5000 ml/min = 5 L/min</b>. (Without converting, 250/5 = 50 is wrong by 100×.)",
  why: ["That's 250/5 with no unit conversion.", null, "Off by 10×.", "Off by 10×.", "That's 250/0.019, using only the arterial value."]
},
{
  id: "cv1-9", quiz: "cv1",
  q: "During exercise, MAP = 100 mmHg, venous pressure = 4 mmHg, and cardiac output = 12 L/min. Compared with the resting value of ~1 PRU, the total peripheral resistance is:",
  opts: ["≈ 0.48 PRU: resistance fell (vasodilation in working muscle)", "≈ 8 PRU: resistance rose", "≈ 1 PRU: unchanged", "≈ 0.08 PRU", "≈ 2.1 PRU"],
  ans: 0,
  exp: "Q = 12 L/min = 12,000/60 = 200 ml/s. R = (100 − 4)/200 = 96/200 = <b>0.48 PRU</b>, about half of resting. CO more than doubled while pressure barely rose, so resistance must have dropped.",
  why: [null, "That's 96/12, using Q in L/min.", "The flow change shows it isn't unchanged.", "That's 96/1200, a unit error.", "That inverts the ratio (200/96)."]
},
{
  id: "cv1-10", quiz: "cv1",
  q: "From the 'Is a 50% reduction in CO a lot?' slide: ΔP = TPR × CO. With no control, TPR stays at 1 PRU. Supine CO is 83 ml/s, and on standing CO halves. What happens to the perfusion pressure (ΔP)?",
  opts: ["It stays ≈ 83 mmHg", "It falls from ≈ 83 to ≈ 42 mmHg (a 50% drop)", "It falls by 25%", "It doubles to ≈ 166 mmHg", "It falls to 0 mmHg"],
  ans: 1,
  exp: "ΔP = TPR × CO = 1 × 83 ≈ 83 mmHg supine. Halving CO with TPR fixed gives 1 × 41.5 ≈ <b>42 mmHg, a 50% reduction</b> in perfusion pressure. That's why baroreflex control (raising TPR and HR) is essential.",
  why: ["ΔP ∝ CO when TPR is constant.", null, "It's linear: half the CO means half the pressure.", "Wrong direction.", "Only if CO went to zero."]
},
{
  id: "cv1-11", quiz: "cv1",
  q: "A classmate computes TPR = 85 mmHg / 5 L/min = 17. What's the best comment?",
  opts: ["Wrong: resistance can't exceed 1", "The number is fine but the units are mmHg·min/L; converting gives 17 × 60/1000 ≈ 1.02 mmHg·s/ml ≈ 1 PRU, matching the slide", "They should have multiplied: 85 × 5 = 425", "They should use arterial pressure only: 90/5 = 18 PRU", "PRU and mmHg·min/L are identical units"],
  ans: 1,
  exp: "17 mmHg·min/L is the same resistance as ≈1 PRU: 1 L/min = 1000 ml / 60 s ≈ 16.7 ml/s, so 17 mmHg/(L/min) = 17 / 16.7 ≈ <b>1.02 mmHg·s/ml</b>. Always state units. The slide converts 5 L/min to 83 cc/s first.",
  why: ["Resistance can take any positive value.", null, "R = ΔP / Q, not ΔP × Q.", "Use ΔP (arterial − venous), not arterial pressure alone.", "They differ by a factor of ~16.7."]
},

/* ============ QUIZ 2 · SV, EF & PV LOOPS ============ */
{
  id: "cv2-1", quiz: "cv2",
  q: "On a left-ventricular pressure-volume loop, end-diastolic volume (EDV) = 120 ml and end-systolic volume (ESV) = 50 ml. What are the stroke volume and ejection fraction?",
  opts: ["SV = 170 ml, EF = 142%", "SV = 70 ml, EF ≈ 58%", "SV = 70 ml, EF ≈ 42%", "SV = 50 ml, EF ≈ 42%", "SV = 120 ml, EF = 100%"],
  ans: 1,
  exp: "<b>SV = EDV − ESV</b> = 120 − 50 = <b>70 ml</b> (the width of the PV loop). <b>EF = SV / EDV</b> = 70/120 ≈ <b>0.58 = 58%</b>, a normal value.",
  why: ["SV is a difference, not a sum, and EF can't exceed 100%.", null, "That's ESV/EDV (50/120), the fraction LEFT behind, not ejected.", "ESV isn't the stroke volume.", "That treats EDV as SV."]
},
{
  id: "cv2-2", quiz: "cv2",
  q: "Which definition of <b>ejection fraction</b> is correct?",
  opts: ["The volume of blood ejected per minute", "The fraction of end-diastolic volume ejected each beat: EF = SV/EDV = (EDV − ESV)/EDV", "ESV divided by SV", "Stroke volume times heart rate", "The pressure at which the aortic valve opens"],
  ans: 1,
  exp: "<b>EF = SV / EDV</b>: the fraction of the filled ventricle that is pumped out each beat. Normal is about 55–70%. A weaker heart (lower contractility) ejects less of its filling volume, so EF falls.",
  why: ["That's cardiac output.", null, "Not the definition.", "That's cardiac output.", "That's the afterload point on the loop (P<sub>a</sub>)."]
},
{
  id: "cv2-3", quiz: "cv2",
  q: "EDV = 150 ml, EF = 60%, and HR = 72 beats/min. What is the cardiac output?",
  opts: ["≈ 10.8 L/min", "≈ 6.5 L/min", "≈ 4.3 L/min", "≈ 90 ml/min", "≈ 6.5 ml/min"],
  ans: 1,
  exp: "SV = EF × EDV = 0.60 × 150 = <b>90 ml</b>. CO = HR × SV = 72 × 90 = 6480 ml/min ≈ <b>6.5 L/min</b>.",
  why: ["That's EDV × HR, which assumes the whole EDV is ejected.", null, "That uses ESV (0.40 × 150 = 60 ml) instead of SV.", "That's SV per BEAT, with the wrong units.", "Right digits, wrong units: 6480 ml/min ≈ 6.5 L/min."]
},
{
  id: "cv2-4", quiz: "cv2",
  q: "After a long-duration mission, cardiac atrophy and lower blood volume reduce EDV from 120 ml to 100 ml, while ESV stays 50 ml. Heart rate is 70 beats/min. Which set of values is correct after flight?",
  opts: ["SV = 70 ml, EF = 70%, CO = 4.9 L/min", "SV = 50 ml, EF = 50%, CO = 3.5 L/min", "SV = 50 ml, EF = 100%, CO = 7 L/min", "SV = 100 ml, EF = 50%, CO = 7 L/min", "SV = 150 ml, EF = 150%, CO = 10.5 L/min"],
  ans: 1,
  exp: "SV = 100 − 50 = <b>50 ml</b>. EF = 50/100 = <b>50%</b>. CO = 70 × 50 = 3500 ml/min = <b>3.5 L/min</b> (down from 4.9). Reduced SV and CO are listed causes of post-flight orthostatic intolerance; the HR has to rise to compensate.",
  why: ["Those are close to the PRE-flight values.", null, "EF = SV/EDV = 50/100, not 50/50.", "SV = EDV − ESV, not EDV.", "SV is a difference, not a sum."]
},
{
  id: "cv2-5", quiz: "cv2",
  q: "On the 'Varying Contractility' slide, contractility increases (steeper end-systolic line 1/C<sub>S</sub>) while preload P<sub>f</sub> and afterload P<sub>a</sub> stay the same. What happens?",
  opts: ["ESV rises, so SV and CO fall", "ESV falls, so SV, EF and CO all rise", "Only heart rate rises", "EDV falls and SV is unchanged", "Nothing changes because the pressures are unchanged"],
  ans: 1,
  exp: "With a steeper 1/C<sub>S</sub> line, ejection against the same P<sub>a</sub> ends at a <b>smaller ESV</b>. EDV is unchanged (same preload), so <b>SV ↑</b>, <b>EF ↑</b>, and <b>CO = HR × SV ↑</b>. Decreasing contractility does the opposite (↓ SV, ↓ CO).",
  why: ["That's DEcreasing contractility.", null, "Contractility changes SV directly.", "Preload is unchanged, so EDV is unchanged.", "The loop gets wider."]
},
{
  id: "cv2-6", quiz: "cv2",
  q: "On the ventricular PV loop (points 1→2→3→4), which phases happen with <b>both valves closed</b>, so volume stays constant?",
  opts: ["1→2 and 3→4 (isovolumetric contraction and isovolumetric relaxation)", "2→3 and 4→1", "Only 2→3", "Only 4→1", "None"],
  ans: 0,
  exp: "1: end-diastole at P<sub>f</sub>. <b>1→2 isovolumetric contraction</b> (both valves closed; pressure rises). 2→3 ejection (aortic valve open; volume falls by SV). <b>3→4 isovolumetric relaxation</b> (both valves closed; pressure falls). 4→1 filling (mitral valve open). These vertical sides of the loop are why SV is simply the loop's width, EDV − ESV.",
  why: [null, "Those are ejection (aortic valve open) and filling (mitral valve open).", "During ejection the aortic valve is open.", "During filling the mitral valve is open.", "Two phases have both valves closed."]
},
{
  id: "cv2-7", quiz: "cv2",
  q: "In the block diagram of the circulation, which pairing is correct?",
  opts: ["Preload = aortic pressure P<sub>a</sub>; afterload = right atrial pressure P<sub>f</sub>", "Preload = right atrial (filling) pressure P<sub>f</sub>; afterload = aortic pressure P<sub>a</sub>", "Preload = heart rate; afterload = stroke volume", "Preload = EF; afterload = CO", "Preload and afterload are both venous pressures"],
  ans: 1,
  exp: "<b>Preload</b> = the filling pressure P<sub>f</sub> (right atrial pressure), which sets EDV. <b>Afterload</b> = the aortic pressure P<sub>a</sub> the ventricle must eject against (where the aortic valve opens, point 2).",
  why: ["Swapped.", null, "Not pressures.", "Not the definitions.", "Afterload is arterial (aortic)."]
},
{
  id: "cv2-8", quiz: "cv2",
  q: "Slide example (table tilt, no controls): V<sub>t</sub> = 5000 ml, C<sub>t</sub> = 125 ml/mmHg. Standing pools blood, raising the zero-pressure filling volume from 3900 ml to 4500 ml. What is P<sub>ms</sub> standing, and what happens to venous return?",
  opts: ["P<sub>ms</sub> = 40 mmHg; VR rises", "P<sub>ms</sub> = 4 mmHg (down from ≈ 8); the VR curve shifts down and left, so CO falls", "P<sub>ms</sub> = 8 mmHg; no change", "P<sub>ms</sub> = 36 mmHg; VR rises", "P<sub>ms</sub> = 0.25 mmHg; VR stops"],
  ans: 1,
  exp: "P<sub>ms</sub> = (V<sub>t</sub> − V<sub>0</sub>)/C<sub>t</sub> = (5000 − 4500)/125 = <b>4 mmHg</b>, roughly half the supine ≈ 8 mmHg ((5000 − 3900)/125 = 8.8). Standing acts like a ~600 ml loss of circulating volume. A lower P<sub>ms</sub> shifts the venous return curve down/left, so the operating point (CO = VR) drops.",
  why: ["That's V<sub>t</sub>/C<sub>t</sub>, which ignores V<sub>0</sub>.", null, "That's the SUPINE value.", "That's V<sub>0</sub>/C<sub>t</sub>.", "Inverted ratio."]
},
{
  id: "cv2-9", quiz: "cv2",
  q: "A patient's EF is 35%, EDV is 160 ml, and HR is 80 beats/min. What is their cardiac output, and what does a low EF suggest?",
  opts: ["≈ 4.5 L/min; reduced contractility (the ventricle ejects a small fraction of its filling)", "≈ 12.8 L/min; a very strong heart", "≈ 2.8 L/min; increased contractility", "≈ 56 L/min; normal", "≈ 4.5 L/min; increased contractility"],
  ans: 0,
  exp: "SV = 0.35 × 160 = <b>56 ml</b>. CO = 80 × 56 = 4480 ml/min ≈ <b>4.5 L/min</b>. CO can stay near normal because the ventricle is dilated (big EDV) and HR is elevated, but the low EF points to <b>reduced contractility</b> (a flatter 1/C<sub>S</sub> line).",
  why: [null, "That's EDV × HR.", "Wrong arithmetic, and low EF means lower contractility.", "That treats 56 ml as L/min.", "CO is right, but a low EF indicates DEcreased contractility."]
},
{
  id: "cv2-10", quiz: "cv2",
  q: "Increasing sympathetic stimulation (with no change in blood volume) shifts the cardiac output curve and the venous return curve how?",
  opts: ["CO curve shifts right and flattens; VR curve shifts down", "CO curve shifts left and steepens (↑ HR and contractility); VR curve shifts up and right (venoconstriction lowers V<sub>0</sub>, raising P<sub>ms</sub>), with a slightly flatter slope from ↑ R<sub>a</sub>", "Only the CO curve moves", "Only the VR curve moves", "Neither curve moves"],
  ans: 1,
  exp: "Sympathetic effects from the slides: <b>↑ HR and contractility</b> (CO curve left and steeper); <b>venoconstriction → V<sub>0</sub> ↓ → P<sub>ms</sub> ↑</b> (VR curve up and right); <b>R<sub>a</sub> ↑</b> (a small slope change in VR); little effect on R<sub>v</sub>. The new intersection has a higher CO.",
  why: ["Reversed.", null, "Venous tone changes too.", "Heart rate and contractility change too.", "Both shift."]
},

/* ============ QUIZ 3 · CROSS-BRIDGE CYCLE ============ */
{
  id: "xb-1", quiz: "xb",
  q: "What is the correct order of the cross-bridge cycle from the 'Summary Cross-Bridge Theory' slide?",
  opts: ["Power stroke → cross-bridge formation → reactivation → detachment", "Cross-bridge formation → power stroke → cross-bridge detachment → reactivation of the myosin head", "Detachment → formation → power stroke → reactivation", "Reactivation → detachment → power stroke → formation", "Formation → detachment → power stroke → reactivation"],
  ans: 1,
  exp: "<b>1. Cross-bridge formation</b>: the energized myosin head (holding ADP + Pi) attaches to actin. <b>2. Power stroke</b>: Pi is released, the head pivots and pulls actin toward the M line, then ADP is released. <b>3. Detachment</b>: a new ATP binds and the actin–myosin link weakens. <b>4. Reactivation</b>: ATP is hydrolyzed to ADP + Pi, re-cocking the head.",
  why: ["The head must attach before it can pull.", null, "Detachment requires an attached cross-bridge first.", "Reversed.", "The power stroke must come before detachment."]
},
{
  id: "xb-2", quiz: "xb",
  q: "What event <b>initiates the power stroke</b>?",
  opts: ["Binding of a new ATP molecule", "Release of the inorganic phosphate (Pi) generated in the previous cycle", "Hydrolysis of ATP", "Ca²⁺ being pumped into the sarcoplasmic reticulum", "Release of acetylcholine"],
  ans: 1,
  exp: "From the slide: 'Inorganic phosphate (Pi) generated in the previous contraction cycle is released, initiating the power (working) stroke. The myosin head pivots and bends as it pulls on the actin filament, sliding it toward the M line. Then ADP is released.'",
  why: ["New ATP binding causes DETACHMENT (step 3).", null, "ATP hydrolysis RE-COCKS the head (step 4).", "Pumping Ca²⁺ back into the SR ends contraction (relaxation).", "ACh acts at the neuromuscular junction, far upstream of the cycle."]
},
{
  id: "xb-3", quiz: "xb",
  q: "ATP plays two different roles in the cross-bridge cycle. Which option gets both right?",
  opts: ["ATP binding pulls actin; ATP hydrolysis attaches myosin", "ATP <b>binding</b> to the myosin head weakens the actin link so the cross-bridge detaches; ATP <b>hydrolysis</b> (→ ADP + Pi) cocks the head into its high-energy configuration", "ATP is only needed to release Ca²⁺", "ATP binding initiates the power stroke; Pi release detaches the head", "ATP is not used in the cycle"],
  ans: 1,
  exp: "Step 3: as <b>new ATP attaches</b>, the link between myosin and actin weakens and the cross-bridge <b>detaches</b>. Step 4: as <b>ATP is split into ADP + Pi</b>, the myosin head is energized (cocked into the high-energy conformation), ready to form a new cross-bridge. The lecture's key line: 'ATP is required to detach the myosin from actin and repeat the cycle.'",
  why: ["Reversed and wrong.", null, "ATP is central to the cycle itself.", "Pi release triggers the power stroke; ATP binding causes detachment.", "ATP is essential."]
},
{
  id: "xb-4", quiz: "xb",
  q: "When the myosin head first attaches to actin (cross-bridge formation), which molecules is it holding, and in what configuration is it?",
  opts: ["ATP; low-energy configuration", "ADP + Pi; high-energy (cocked) configuration", "Nothing; relaxed configuration", "Ca²⁺; low-energy configuration", "ADP only; low-energy configuration"],
  ans: 1,
  exp: "After the reactivation step, the head holds <b>ADP + Pi</b> and is in its <b>high-energy configuration</b>. It attaches to an exposed binding site on actin, forming the cross-bridge. After the power stroke and detachment (when ATP binds), it's in its low-energy configuration.",
  why: ["ATP-bound myosin is the DETACHED, low-energy state.", null, "It carries ADP + Pi.", "Ca²⁺ binds troponin, not myosin.", "ADP alone is held briefly at the end of the power stroke."]
},
{
  id: "xb-5", quiz: "xb",
  q: "Fill in the blanks: In the resting state, actin binding sites are covered by _______. During contraction, Ca²⁺ is released from the _______ and binds to _______, which moves tropomyosin away from the binding sites.",
  opts: ["troponin; T-tubule; tropomyosin", "tropomyosin; sarcoplasmic reticulum; troponin", "myosin; nucleus; actin", "tropomyosin; mitochondria; myosin", "troponin; sarcoplasmic reticulum; actin"],
  ans: 1,
  exp: "At rest (no Ca²⁺) <b>tropomyosin</b> blocks the binding sites. The muscle action potential triggers Ca²⁺ release from the <b>sarcoplasmic reticulum</b>. Ca²⁺ binds <b>troponin</b>, and the troponin–tropomyosin complex moves, exposing the myosin binding sites.",
  why: ["Troponin and tropomyosin are swapped, and Ca²⁺ is stored in the SR.", null, "Myosin doesn't cover the sites.", "Ca²⁺ is released from the SR and binds troponin.", "Tropomyosin covers the sites, and Ca²⁺ binds troponin, not actin."]
},
{
  id: "xb-6", quiz: "xb",
  q: "After death, ATP production stops and muscles become rigid (rigor mortis). Based on the cross-bridge cycle, why?",
  opts: ["Without ATP, Ca²⁺ can't bind troponin", "Without ATP, myosin heads can't detach from actin, so cross-bridges stay locked", "Without ATP, actin filaments dissolve", "Without ATP, Pi is released continuously", "Without ATP, the muscle stretches"],
  ans: 1,
  exp: "ATP binding is what <b>detaches</b> myosin from actin (step 3). With no ATP, the heads stay bound after the power stroke, leaving the muscle stiff. (Ca²⁺ can't be pumped back into the SR without ATP either, so binding sites stay exposed.)",
  why: ["Ca²⁺ binding to troponin doesn't need ATP.", null, "Filaments remain.", "Pi comes from ATP hydrolysis; there would be none.", "The muscle locks; it doesn't stretch."]
},
{
  id: "xb-7", quiz: "xb",
  q: "How does a muscle <b>relax</b> after contraction?",
  opts: ["Myosin heads dissolve", "Ca²⁺ is pumped back into the sarcoplasmic reticulum, so tropomyosin re-covers the binding sites and cross-bridges can't re-form", "ATP is removed", "Actin and myosin shorten", "Acetylcholine increases"],
  ans: 1,
  exp: "From 'Muscular Contraction': <b>Ca²⁺ is pumped back into the SR</b>, so contraction ends and relaxation follows. Without Ca²⁺ bound to troponin, tropomyosin blocks actin's binding sites again.",
  why: ["Not what happens.", null, "Removing ATP would cause rigor, not relaxation.", "Filaments don't shorten; they slide.", "ACh triggers contraction."]
},
{
  id: "xb-8", quiz: "xb",
  q: "According to the sliding filament model, what happens to the filaments and sarcomere during contraction?",
  opts: ["Actin and myosin filaments both shorten", "Actin and myosin slide over each other, so overlap increases and the sarcomere (Z-band to Z-band) shortens; the filaments themselves don't change length", "Only myosin filaments shorten", "The sarcomere lengthens", "Z-bands move apart"],
  ans: 1,
  exp: "During contraction actin and myosin <b>slide past each other</b>; the <b>overlap increases</b> and the <b>sarcomere shortens</b>, pulling the Z-bands together. Each myosin head pulls actin <b>toward the M line</b> (the center of the sarcomere).",
  why: ["Filament lengths stay constant.", null, "Myosin length is constant.", "It shortens.", "They move closer together."]
},
{
  id: "xb-9", quiz: "xb",
  q: "Put the excitation–contraction steps in order: (1) Ca²⁺ released from the SR, (2) acetylcholine released at the neuromuscular junction, (3) muscle action potential travels along the fiber, (4) Ca²⁺ binds troponin and binding sites are exposed, (5) cross-bridge cycling.",
  opts: ["2 → 3 → 1 → 4 → 5", "1 → 2 → 3 → 4 → 5", "3 → 2 → 1 → 5 → 4", "2 → 1 → 3 → 4 → 5", "4 → 1 → 2 → 3 → 5"],
  ans: 0,
  exp: "Motor neuron AP → <b>ACh at the NMJ</b> (2) → <b>muscle AP</b> propagates both ways along the fiber, the origin of EMG (3) → <b>Ca²⁺ release from the SR</b> (1) → <b>Ca²⁺ binds troponin</b>, tropomyosin moves (4) → <b>cross-bridge cycling</b> (5).",
  why: [null, "Ca²⁺ release is triggered BY the muscle action potential.", "ACh comes before the muscle AP, and binding sites must be exposed before cycling.", "The muscle AP comes before SR Ca²⁺ release.", "Ca²⁺ must be released before it binds troponin."]
},
{
  id: "xb-10", quiz: "xb",
  q: "A toxin blocks the release of Pi from the myosin head. Which step of the cycle is blocked?",
  opts: ["Cross-bridge formation", "The power stroke", "Detachment by ATP", "Ca²⁺ release", "Nothing"],
  ans: 1,
  exp: "Pi release is what <b>initiates the power stroke</b>. If Pi can't leave, the head stays attached in its cocked state without pulling, so no force is generated.",
  why: ["The head can still attach.", null, "Detachment needs a completed power stroke and then ATP binding.", "Ca²⁺ release is upstream and unaffected.", "Pi release is required for the power stroke."]
},

/* ============ QUIZ 4 · MUSCLE SPINDLES (TRUE/FALSE + EXPLAIN) ============ */
{
  id: "sp-1", quiz: "sp", tf: true,
  q: "Muscle spindles are arranged <b>in series</b> with the extrafusal muscle fibers.",
  opts: ["True", "False"], ans: 1,
  exp: "<b>False.</b> Spindles are stretch receptors within the belly of the muscle, attached <b>in parallel</b> with the muscle fibers, so they experience the same relative length change as the muscle. <b>Golgi tendon organs</b> are the ones in series (at the muscle–tendon junction), which is why GTOs sense force.",
  why: ["Series placement describes GTOs, not spindles.", null]
},
{
  id: "sp-2", quiz: "sp", tf: true,
  q: "Muscle spindles give information about muscle <b>length</b> and the <b>rate of change</b> of length.",
  opts: ["True", "False"], ans: 0,
  exp: "<b>True.</b> Spindles report length (static) and rate of change of length (dynamic). Primary (Ia) endings respond to both; secondary (II) endings respond mainly to length. That's the basis of proprioception and the stretch reflex.",
  why: [null, "That is exactly what the lecture says spindles encode."]
},
{
  id: "sp-3", quiz: "sp", tf: true,
  q: "Gamma (γ) motor neurons innervate the extrafusal fibers that produce the muscle's force.",
  opts: ["True", "False"], ans: 1,
  exp: "<b>False.</b> <b>Alpha (α)</b> motor neurons innervate the main muscle mass (<b>extrafusal</b> fibers) to produce force. <b>Gamma (γ)</b> motor neurons innervate the <b>intrafusal</b> fibers inside the spindle, tightening the spindle's ends to set its sensitivity (gain).",
  why: ["That describes alpha motor neurons.", null]
},
{
  id: "sp-4", quiz: "sp", tf: true,
  q: "Primary (Ia) afferents are among the fastest-conducting nerves in the body and respond to a combination of muscle length and rate of change of length.",
  opts: ["True", "False"], ans: 0,
  exp: "<b>True.</b> Ia afferents are myelinated and large (~17 µm in the spindle diagram), so they're among the fastest-conducting nerves, and they respond to <b>length + rate of change</b>. Secondary (II) afferents are myelinated but smaller (~8 µm), hence slower, and respond to <b>length</b>.",
  why: [null, "Both parts match the 'Spindle Nerves' slide."]
},
{
  id: "sp-5", quiz: "sp", tf: true,
  q: "Secondary (Type II) spindle afferents mainly signal how quickly the muscle is being stretched.",
  opts: ["True", "False"], ans: 1,
  exp: "<b>False.</b> Type II afferents respond to muscle <b>length</b> (static, sustained stretch). Sensitivity to <b>rate of change</b> (velocity) is a property of the <b>primary Ia</b> endings.",
  why: ["Rate sensitivity belongs to Ia afferents.", null]
},
{
  id: "sp-6", quiz: "sp", tf: true,
  q: "If only alpha motor neurons were activated during a contraction (no gamma activity), the spindle would go slack and stop signaling further length changes.",
  opts: ["True", "False"], ans: 0,
  exp: "<b>True.</b> When extrafusal fibers shorten, the parallel spindle is unloaded and goes slack, and its afferent firing drops. In <b>α-γ coactivation</b>, gamma neurons contract the intrafusal fibers at the same time, keeping the spindle taut and in its sensitive range, so it can still signal length changes.",
  why: [null, "This is exactly the problem α-γ coactivation solves."]
},
{
  id: "sp-7", quiz: "sp", tf: true,
  q: "Nuclear chain fibers are innervated by gamma-<b>dynamic</b> efferents.",
  opts: ["True", "False"], ans: 1,
  exp: "<b>False.</b> <b>Nuclear bag</b> fibers (nuclei clumped in a bulging bag) are innervated by <b>gamma-dynamic</b> nerves and are the origin of Ia afferents. <b>Nuclear chain</b> fibers (nuclei spread out in a line) are innervated by <b>gamma-static</b> nerves and are the origin of Ia and II afferents.",
  why: ["Chain fibers get gamma-STATIC innervation.", null]
},
{
  id: "sp-8", quiz: "sp", tf: true,
  q: "Gamma-static efferents adjust the spindle's response to changes in <b>length</b>, while gamma-dynamic efferents adjust its response to the <b>rate of change</b> of length.",
  opts: ["True", "False"], ans: 0,
  exp: "<b>True.</b> From 'Spindle Nerves': <b>gamma-static</b> efferents relate to changes in length; <b>gamma-dynamic</b> efferents relate to the rate of change in length. This lets the CNS tune the spindle's static and dynamic sensitivity separately.",
  why: [null, "This matches the slide."]
},
{
  id: "sp-9", quiz: "sp", tf: true,
  q: "In the patellar (knee-jerk) reflex, spindle primary afferents make <b>monosynaptic</b> excitatory connections onto the alpha motor neurons of the quadriceps.",
  opts: ["True", "False"], ans: 0,
  exp: "<b>True.</b> The hammer stretches the quadriceps spindles. Ia afferents enter the cord (~L4) and synapse <b>directly</b> (a single synapse) on quadriceps α motor neurons, which fire and contract the quadriceps (time ~1–2 ms per the slide). The antagonist (hamstrings) is inhibited through an inhibitory interneuron (reciprocal innervation).",
  why: [null, "It's the textbook monosynaptic reflex."]
},
{
  id: "sp-10", quiz: "sp", tf: true,
  q: "The spindle stretch reflex causes the stretched muscle to <b>relax</b>.",
  opts: ["True", "False"], ans: 1,
  exp: "<b>False.</b> The stretch reflex makes the stretched muscle <b>contract</b>, a protective measure against being pulled beyond its normal range. It's the antagonist that's inhibited (reciprocal innervation). Relaxation of the loaded muscle is the <b>Golgi tendon reflex</b> (Ib afferents → inhibitory interneuron), which can override the stretch reflex.",
  why: ["You're thinking of the Golgi tendon reflex.", null]
},
{
  id: "sp-11", quiz: "sp", tf: true,
  q: "Stretching a muscle increases the firing rate of the spindle's sensory fiber.",
  opts: ["True", "False"], ans: 0,
  exp: "<b>True.</b> From 'How is muscle stretch detected?': in an unstretched muscle, APs fire at a constant rate. Stretching the muscle stretches the spindle, which <b>increases the rate of APs</b> in the sensory fiber.",
  why: [null, "Stretch increases spindle firing."]
},
{
  id: "sp-12", quiz: "sp", tf: true,
  q: "A typical muscle spindle is about 4–7 mm long and contains 3–12 intrafusal muscle fibers.",
  opts: ["True", "False"], ans: 0,
  exp: "<b>True.</b> From 'Spindle fiber types': a typical spindle is <b>4–7 mm long</b>, 80–200 µm in diameter, and has <b>3–12 intrafusal fibers</b> of two types (nuclear bag and nuclear chain).",
  why: [null, "These are the slide's numbers."]
},
{
  id: "sp-13", quiz: "sp", tf: true,
  q: "Muscle spindles are the muscle's primary <b>force</b> transducers.",
  opts: ["True", "False"], ans: 1,
  exp: "<b>False.</b> <b>Golgi tendon organs</b> are the force transducers (in series with the fibers, Ib afferents, more sensitive to active tension). Spindles are <b>length</b> (stretch) receptors.",
  why: ["That's the GTO's job.", null]
},
{
  id: "sp-14", quiz: "sp", tf: true,
  q: "Nuclear bag fibers are the origin of Ia afferents, while nuclear chain fibers give rise to both Ia and II afferents.",
  opts: ["True", "False"], ans: 0,
  exp: "<b>True.</b> <b>Bag</b> fibers: gamma-dynamic innervation, origin of <b>Ia</b>. <b>Chain</b> fibers: gamma-static innervation, origin of <b>Ia and II</b>. So the II (length-only) signal comes from chain fibers.",
  why: [null, "This matches the 'Spindle fiber types' slide."]
},

/* ============ QUIZ 5 · COUNTERMEASURES ============ */
{
  id: "cm-1", quiz: "cm",
  q: "Lower Body Negative Pressure (LBNP) is used as a cardiovascular countermeasure. How does it work?",
  opts: ["It pushes blood toward the head to raise central volume", "It applies suction (up to about −50 mmHg) to the lower body, pulling blood into the legs, reducing central blood volume and stimulating cardiopulmonary (and at high suction, baro-) receptors, producing CV responses similar to standing", "It directly builds bone", "It lowers cabin CO₂", "It replaces the need for any exercise"],
  ans: 1,
  exp: "LBNP recreates orthostatic stress in microgravity: negative pressure up to <b>−50 mmHg</b>, <b>reduction of central blood volume</b>, stimulation of <b>CP receptors</b> (and baroreceptors at high suction), and CV responses <b>similar to standing</b>. Long exposure raises plasma renin activity and aldosterone. It's also proposed as a mechanical SANS countermeasure.",
  why: ["It does the opposite: it shifts fluid footward.", null, "Not its mechanism.", "Unrelated.", "It complements exercise; it doesn't replace it."]
},
{
  id: "cm-2", quiz: "cm",
  q: "Which countermeasure is described as preventing blood pooling, increasing total peripheral resistance, and reducing leg vein compliance?",
  opts: ["Fluid loading", "G-suits", "Erythropoietin (EPO)", "Hypoxia", "Bisphosphonates"],
  ans: 1,
  exp: "<b>G-suits</b> squeeze the legs and abdomen to <b>prevent pooling</b>, <b>increase TPR</b> and <b>reduce leg venous compliance</b>, directly countering several causes of post-flight orthostatic intolerance.",
  why: ["Fluid loading restores plasma volume before reentry.", null, "EPO increases red cell mass.", "Hypoxia stimulates endogenous EPO.", "Bisphosphonates are a bone drug."]
},
{
  id: "cm-3", quiz: "cm",
  q: "Why do astronauts perform <b>fluid loading</b> before reentry?",
  opts: ["To prevent kidney stones", "To restore the plasma/blood volume lost during flight (from the headward fluid shift), which reduces orthostatic intolerance on landing", "To increase muscle mass", "To reduce intraocular pressure", "To raise CO₂ levels"],
  ans: 1,
  exp: "In flight, the headward fluid shift is read as 'excess' volume, so the body sheds fluid: <b>total blood volume drops ~11%</b>. <b>Reduced blood volume</b> is a main cause of orthostatic intolerance. Fluid loading (especially before reentry and during LBNP testing) refills the circulation.",
  why: ["Hydration helps with stones, but that's not the reason given for reentry fluid loading.", null, "Unrelated.", "Not the purpose.", "Unrelated."]
},
{
  id: "cm-4", quiz: "cm",
  q: "Why is <b>erythropoietin (EPO)</b> a risky cardiovascular countermeasure?",
  opts: ["It lowers blood volume", "It increases red cell mass and blood volume, but a high hematocrit ('thick' blood) can cause a stroke or heart attack", "It weakens bone", "It causes muscle atrophy", "It has no effect"],
  ans: 1,
  exp: "EPO raises red cell mass, which increases blood volume, but a <b>high hematocrit</b> makes the blood viscous ('thick'), raising the risk of <b>stroke or heart attack</b>. A gentler approach is <b>hypoxia</b>, which stimulates endogenous EPO.",
  why: ["It increases blood volume.", null, "Not the concern.", "Not the concern.", "It does work; the danger is overshooting."]
},
{
  id: "cm-5", quiz: "cm",
  q: "<b>Body cooling</b> and <b>vasoconstrictors</b> (e.g., midodrine) both help orthostatic tolerance mainly by:",
  opts: ["Increasing total peripheral resistance", "Increasing heart rate only", "Increasing red cell mass", "Lowering intracranial pressure", "Increasing urine output"],
  ans: 0,
  exp: "Both <b>raise total peripheral resistance</b>: body cooling causes vasoconstriction, and drugs like ephedrine, phenylephrine, ergotamine and <b>midodrine</b> directly constrict vessels. That helps keep perfusion pressure up when standing (ΔP = TPR × CO).",
  why: [null, "Not their primary action.", "That's EPO/hypoxia.", "That's a SANS (acetazolamide) idea.", "That would worsen the volume deficit."]
},
{
  id: "cm-6", quiz: "cm",
  q: "Exercise (aerobic and resistive) is the primary countermeasure for muscle, bone and the CV system. What downside does the lecture highlight?",
  opts: ["It weakens bone", "It increases the use of in-flight resources (water, food, O₂) and crew time", "It has no cardiovascular benefit", "It works identically for every astronaut", "It can only be done with artificial gravity"],
  ans: 1,
  exp: "Exercise benefits muscle, bone, CV and mental health, but it <b>increases resource use (water, food, O₂)</b>. There are also <b>huge individual differences</b>, so personalized countermeasure programs are needed.",
  why: ["Exercise protects bone.", null, "It has CV benefits.", "Responses vary a lot between people.", "It's done daily on the ISS without AG."]
},
{
  id: "cm-7", quiz: "cm",
  q: "Which statement about ARED (Advanced Resistive Exercise Device) is correct?",
  opts: ["It uses free weights", "It uses vacuum cylinders and flywheel cables, giving up to ~600 lbf for bar exercises (squats, deadlifts, calf raises), and combined with adequate energy intake and vitamin D it was the first evidence that bone can be maintained on 4–6 month missions", "It's a treadmill providing 100% body-weight loading", "It's a centrifuge", "It only trains the arms"],
  ans: 1,
  exp: "ARED (installed 2009, replacing iRED) uses <b>vacuum tubes and flywheel cables</b>: <b>600 lbf</b> bar and 150 lbf cable, about double iRED. Smith et al. (2014) gave the first evidence that <b>resistance exercise + adequate energy intake + vitamin D</b> can maintain bone (small sample sizes, though).",
  why: ["Free weights don't work in microgravity.", null, "The ISS treadmill gives ~70% gravity-replacement loads.", "Not a centrifuge.", "It works all major muscle groups."]
},
{
  id: "cm-8", quiz: "cm",
  q: "How do bisphosphonates (e.g., alendronate, zoledronic acid) work as a bone countermeasure?",
  opts: ["They stimulate osteoblasts to build bone", "They are anti-resorptive: they interfere with osteoclasts, slowing bone breakdown", "They supply calcium", "They mimic gravity", "They increase urinary calcium excretion"],
  ans: 1,
  exp: "In space, osteoblast activity falls while osteoclasts appear unaffected, so there's net loss. <b>Bisphosphonates</b> are <b>anti-resorptive</b>: they interfere with the <b>osteoclast</b>, slowing loss. Diet (calcium, vitamin D), exercise, suits and possibly AG are the other bone countermeasures.",
  why: ["They target osteoclasts, not osteoblasts.", null, "That's diet.", "That's AG.", "Space already INCREASES urinary calcium (~60–70%)."]
},
{
  id: "cm-9", quiz: "cm",
  q: "Passive countermeasure suits such as the Penguin Suit and the Gravity Loading Countermeasure Skinsuit (GLCS) work mainly by:",
  opts: ["Heating muscles", "Loading the body along its long axis and keeping muscles in a stretched/loaded state, since atrophy is minimized when the muscle is maintained stretched", "Electrically stimulating nerves", "Spinning the astronaut", "Increasing cabin pressure"],
  ans: 1,
  exp: "Under <b>Stretching</b> in Muscle II: atrophy is minimized when the muscle is maintained in the stretched condition. Suits like the <b>Penguin Suit</b> and <b>GLCS</b> provide passive axial loading to mimic some gravity loading, for muscle and bone.",
  why: ["Not the mechanism.", null, "Electrical stimulation is a separate approach.", "That's AG.", "Unrelated."]
},
{
  id: "cm-10", quiz: "cm",
  q: "Which is a <b>non-mechanical</b> countermeasure idea for SANS?",
  opts: ["Lower Body Negative Pressure", "Thigh cuffs", "Artificial gravity", "Pharmacological approaches (e.g., acetazolamide) to balance the translaminar pressure gradient by lowering ICP or raising IOP", "G-suits"],
  ans: 3,
  exp: "SANS countermeasures. <b>Mechanical</b>: LBNP, artificial gravity, thigh cuffs (pulling fluid footward). <b>Non-mechanical</b>: <b>pharmacological</b> (balance TLPG, lower ICP or raise IOP, e.g., acetazolamide), plus diet and atmosphere changes based on future findings.",
  why: ["Mechanical.", "Mechanical.", "Mechanical.", null, "Mechanical (and a CV countermeasure)."]
},
{
  id: "cm-11", quiz: "cm",
  q: "Why is artificial gravity called a <b>multi-system</b> countermeasure?",
  opts: ["It only targets bone", "Current countermeasures (exercise, LBNP, fluid loading, suits, drugs) have limited effectiveness, while AG challenges all physiological systems at once (CV, muscle, bone, neurovestibular), especially when combined with exercise", "It's cheaper than exercise", "It needs no engineering", "It eliminates the need for life support"],
  ans: 1,
  exp: "Current countermeasures each target one system and have <b>limited effectiveness</b>. AG <b>challenges all physiological systems</b> at once, especially <b>combined with exercise</b>. Open questions remain: continuous vs intermittent, g-level, gravity gradient, exercise protocol, radius/rpm.",
  why: ["It targets every system.", null, "AG is expensive (power, vibration, construction, $$$).", "It has major engineering challenges.", "Unrelated."]
},
{
  id: "cm-12", quiz: "cm",
  q: "Which of these is <b>NOT</b> a countermeasure for post-flight orthostatic intolerance listed in the CV II lecture?",
  opts: ["Lower Body Negative Pressure", "G-suits", "Fluid loading", "Vasoconstrictors such as midodrine", "Bisphosphonates"],
  ans: 4,
  exp: "The CV II countermeasures are exercise, <b>LBNP</b>, <b>fluid loading</b>, <b>G-suits</b>, <b>vasoconstrictors</b>, EPO, hypoxia and body cooling. <b>Bisphosphonates</b> are a <b>bone</b> countermeasure (anti-resorptive).",
  why: ["Listed.", "Listed.", "Listed.", "Listed.", null]
},
{
  id: "cm-13", quiz: "cm",
  q: "Why does the lecture emphasize <b>personalized</b> countermeasure programs?",
  opts: ["Because every astronaut responds identically", "Because there are huge individual differences in how people decondition and respond to countermeasures", "Because exercise equipment is personal property", "Because only commanders exercise", "Because suits come in one size"],
  ans: 1,
  exp: "Muscle II: '<b>Again, huge individual differences!</b> Need of personalized countermeasures program.' Astronauts also follow personal exercise plans on ARED.",
  why: ["The opposite is true.", null, "Not the reason.", "Not true.", "Not the reason."]
},

/* ============ QUIZ 6 · MOCK QUIZ (MIXED) ============ */
{
  id: "mk-1", quiz: "mock",
  q: "<b>[CV calc]</b> An astronaut has HR = 60 beats/min and SV = 80 ml. Mean arterial pressure is 93 mmHg and venous pressure is 3 mmHg. What are the cardiac output and total peripheral resistance?",
  opts: ["CO = 4.8 L/min; TPR ≈ 1.13 PRU", "CO = 4.8 L/min; TPR ≈ 18.75 PRU", "CO = 0.75 L/min; TPR ≈ 1.13 PRU", "CO = 48 L/min; TPR ≈ 0.11 PRU", "CO = 4.8 L/min; TPR ≈ 1.16 PRU"],
  ans: 0,
  exp: "CO = HR × SV = 60 × 80 = 4800 ml/min = <b>4.8 L/min</b> = 80 ml/s. TPR = ΔP/Q = (93 − 3)/80 = 90/80 ≈ <b>1.13 PRU</b>.",
  why: [null, "That's 90/4.8, using Q in L/min.", "That's SV/HR.", "Unit slip: 4800 ml is 4.8 L.", "That's 93/80, using arterial pressure instead of ΔP."]
},
{
  id: "mk-2", quiz: "mock",
  q: "<b>[CV calc]</b> V̇O₂ = 300 ml O₂/min, C<sub>A</sub> = 0.19 ml O₂/ml, C<sub>V</sub> = 0.13 ml O₂/ml. The heart rate is 50 beats/min and EDV is 160 ml. What are CO, SV and EF?",
  opts: ["CO = 5 L/min; SV = 100 ml; EF = 62.5%", "CO = 1.58 L/min; SV = 32 ml; EF = 20%", "CO = 5 L/min; SV = 60 ml; EF = 37.5%", "CO = 18 L/min; SV = 360 ml; EF = 225%", "CO = 5 L/min; SV = 100 ml; EF = 160%"],
  ans: 0,
  exp: "Fick: Q = 300/(0.19 − 0.13) = 300/0.06 = <b>5000 ml/min</b>. SV = CO/HR = 5000/50 = <b>100 ml</b>. EF = SV/EDV = 100/160 = <b>62.5%</b>.",
  why: [null, "That's 300/0.19 (only C<sub>A</sub>).", "60 ml is the ESV (160 − 100), not the stroke volume.", "That's 300 × 0.06 with the units confused.", "EF = SV/EDV, which can't exceed 100%."]
},
{
  id: "mk-3", quiz: "mock",
  q: "<b>[Cross-bridge]</b> Which pairing of step and trigger is correct?",
  opts: ["Power stroke: new ATP binds", "Detachment: new ATP binds to the myosin head; Reactivation: ATP is hydrolyzed to ADP + Pi, cocking the head", "Formation: Pi is released", "Reactivation: Ca²⁺ is pumped into the SR", "Detachment: Pi is released"],
  ans: 1,
  exp: "Formation: the cocked head (ADP + Pi) binds actin. Power stroke: <b>Pi release</b>, the head pivots, and ADP is released. Detachment: <b>new ATP binds</b>. Reactivation: <b>ATP → ADP + Pi</b> re-cocks the head.",
  why: ["ATP binding causes detachment, not the power stroke.", null, "Pi release starts the power stroke.", "Ca²⁺ reuptake causes relaxation.", "Pi release starts the power stroke."]
},
{
  id: "mk-4", quiz: "mock",
  q: "<b>[Cross-bridge]</b> A drug blocks the Ca²⁺ pump that returns Ca²⁺ to the sarcoplasmic reticulum (ATP is still available). What happens?",
  opts: ["The muscle cannot contract", "Ca²⁺ stays bound to troponin, binding sites stay exposed, and cross-bridges keep cycling, so the muscle stays contracted and can't relax normally", "Myosin can't detach (rigor)", "The muscle relaxes faster", "Actin dissolves"],
  ans: 1,
  exp: "Relaxation requires <b>Ca²⁺ pumped back into the SR</b>. If Ca²⁺ stays in the cytoplasm, troponin keeps tropomyosin off the binding sites. With ATP available, cycling continues, giving sustained contraction. (Rigor is the no-ATP case.)",
  why: ["Contraction still happens; relaxation is the problem.", null, "ATP is available, so detachment still works.", "The opposite.", "No."]
},
{
  id: "mk-5", quiz: "mock", tf: true,
  q: "<b>[Spindle T/F]</b> Because spindles lie in parallel with the extrafusal fibers, they experience the same relative length change as the muscle.",
  opts: ["True", "False"], ans: 0,
  exp: "<b>True.</b> Spindles are usually attached in parallel with the muscle fibers, so they experience the same relative length change. That's what makes them length detectors. (GTOs, in series, sense tension instead.)",
  why: [null, "This is exactly the slide statement."]
},
{
  id: "mk-6", quiz: "mock", tf: true,
  q: "<b>[Spindle T/F]</b> During a voluntary contraction driven only by alpha motor neurons, Ia firing from the shortening muscle's spindles would increase.",
  opts: ["True", "False"], ans: 1,
  exp: "<b>False.</b> As the extrafusal fibers shorten, the parallel spindle is unloaded and goes slack, so <b>Ia firing decreases</b> (it can fall silent). Gamma co-activation (α-γ coactivation) keeps the spindle taut so it keeps signaling.",
  why: ["Shortening unloads the spindle; it doesn't stretch it.", null]
},
{
  id: "mk-7", quiz: "mock",
  q: "<b>[Countermeasures]</b> An astronaut returning from 6 months on the ISS has reduced blood volume, increased leg venous compliance and reduced baroreflex sensitivity. Which combination best targets these problems on landing day?",
  opts: ["Bisphosphonates and vitamin D", "Fluid loading before reentry plus a G-suit (prevents pooling, ↑ TPR, ↓ leg vein compliance)", "Acetazolamide only", "ARED squats on landing day", "Higher cabin CO₂"],
  ans: 1,
  exp: "<b>Fluid loading</b> restores the volume lost to the fluid shift. A <b>G-suit</b> prevents pooling, raises TPR and reduces leg venous compliance. In flight, exercise and LBNP help maintain CV conditioning; vasoconstrictors such as midodrine are another option.",
  why: ["Those are bone countermeasures.", null, "That's a SANS (ICP) idea.", "Resistance exercise is an in-flight countermeasure, not a landing-day fix.", "Harmful and unrelated."]
},
{
  id: "mk-8", quiz: "mock",
  q: "<b>[Countermeasures]</b> Which countermeasure is matched to the correct system and mechanism?",
  opts: ["Bisphosphonates: muscle, by building fibers", "LBNP: cardiovascular (and proposed for SANS), by drawing fluid into the lower body to mimic standing", "G-suit: bone, by blocking osteoclasts", "EPO: bone, by adding calcium", "GLCS skinsuit: cardiovascular, by raising hematocrit"],
  ans: 1,
  exp: "<b>LBNP</b> pulls fluid footward (up to −50 mmHg), reducing central volume and stimulating CP/baroreceptors, which conditions the CV system and may help SANS. Bisphosphonates are bone (anti-osteoclast). G-suits are CV (pooling, TPR). EPO is CV (red cell mass). GLCS is passive axial loading for muscle/bone.",
  why: ["Bisphosphonates target bone resorption.", null, "G-suits are a CV countermeasure.", "EPO raises red cell mass.", "GLCS provides axial loading."]
}
];

// ---------- Where each answer is in the slides ----------
// File names match the PDFs in the "Exam material" folder; page = PDF page (same as the slide number).
const FILES = {
  M1: "2 – Muscle Mechanics I.pdf",
  M2: "3 – Muscle Mechanics II.pdf",
  CV1: "4 – Cardiovascular System I.pdf",
  CV2: "5 – Cardiovascular System II.pdf",
  AG: "6 – Artifical Gravity.pdf",
  SANS: "7 – SANS.pdf",
  BONE: "8 – Bone.pdf"
};
const REFS = {
  "cv1-1": [["CV1","12"]], "cv1-2": [["CV1","12"],["CV2","19"]], "cv1-3": [["CV1","27"]], "cv1-4": [["CV1","27"]],
  "cv1-5": [["CV1","6"]], "cv1-6": [["CV1","6"]], "cv1-7": [["CV1","6"]], "cv1-8": [["CV1","6"]],
  "cv1-9": [["CV1","12"]], "cv1-10": [["CV2","19"]], "cv1-11": [["CV1","12"]],
  "cv2-1": [["CV1","25–26"]], "cv2-2": [["CV1","25, 29"]], "cv2-3": [["CV1","27"]],
  "cv2-4": [["CV1","27"],["CV2","15–16"]], "cv2-5": [["CV1","27–29"]], "cv2-6": [["CV1","25"]], "cv2-7": [["CV1","30"]],
  "cv2-8": [["CV2","17"],["CV1","16–18"]], "cv2-9": [["CV1","27–29"]], "cv2-10": [["CV1","32, 35–36"]],
  "xb-1": [["M1","11"]], "xb-2": [["M1","11"]], "xb-3": [["M1","8, 11"]], "xb-4": [["M1","11"]], "xb-5": [["M1","9"]],
  "xb-6": [["M1","8, 11"]], "xb-7": [["M1","13"]], "xb-8": [["M1","7–8"]], "xb-9": [["M1","12–13"]], "xb-10": [["M1","11"]],
  "sp-1": [["M1","31–32, 39"]], "sp-2": [["M1","31, 33"]], "sp-3": [["M1","32"]], "sp-4": [["M1","33"]], "sp-5": [["M1","33"]],
  "sp-6": [["M1","36"]], "sp-7": [["M1","34"]], "sp-8": [["M1","33"]], "sp-9": [["M1","37–38"]], "sp-10": [["M1","37, 40"]],
  "sp-11": [["M1","35"]], "sp-12": [["M1","34"]], "sp-13": [["M1","31, 39"]], "sp-14": [["M1","34"]],
  "cm-1": [["CV2","25"],["SANS","45"]], "cm-2": [["CV2","26"]], "cm-3": [["CV2","13, 16, 26"]], "cm-4": [["CV2","26"]],
  "cm-5": [["CV2","26"]], "cm-6": [["M2","8"]], "cm-7": [["M2","10"],["BONE","30–31"]], "cm-8": [["BONE","27, 34"]],
  "cm-9": [["M2","8, 13"],["BONE","32"]], "cm-10": [["SANS","45"]], "cm-11": [["AG","5"],["M2","16"]],
  "cm-12": [["CV2","25–26"],["BONE","34"]], "cm-13": [["M2","8"]],
  "mk-1": [["CV1","12, 27"]], "mk-2": [["CV1","6, 25, 27"]], "mk-3": [["M1","11"]], "mk-4": [["M1","9, 13"]],
  "mk-5": [["M1","31"]], "mk-6": [["M1","36"]], "mk-7": [["CV2","16, 26"]], "mk-8": [["CV2","25–26"],["BONE","32, 34"],["SANS","45"]]
};
// Notes shown with the reference when the slides don't state something directly
const REF_NOTES = {
  "cv2-1": "EF = SV/EDV is the standard definition (named in the quiz email); the slides show SV as the width of the PV loop.",
  "cv2-2": "EF itself isn't defined on the slides; review SV on the PV loop and the contractility slides.",
  "cv2-3": "EF = SV/EDV is the standard definition, not on the slides.",
  "cv2-9": "EF = SV/EDV is the standard definition, not on the slides.",
  "mk-2": "EF = SV/EDV is the standard definition, not on the slides."
};
const FORMULA_REFS = [[["CV1","12"]], [["CV1","27"]], [["CV1","6"]], [["CV1","25"]], [], [["CV2","19"]], [["CV1","16"],["CV2","17"]]];
