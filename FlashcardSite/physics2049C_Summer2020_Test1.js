var rawFlashcardText = String.raw`(Constants) Coulomb's Constant	k_e=8.99ᴇ9\frac{Nm^{2}}{C^{2}} \\ k_e=\frac{1}{4πƐ_0}
(Constants) Permittivity of Free Space	Ɛ_0=8.85ᴇ\text{ -}12\frac{C^{2}}{Nm^{2}}
(Constants) Elementary Charge	e=1.60ᴇ\text{ -}19\text{ }C
(Constants) Proton Mass	m_p=1.67ᴇ\text{ -}27\text{ }kg
(Constants) Electron Mass	m_e=9.11ᴇ\text{ -}31\text{ }kg
	
(Units) Farads	F=\frac{C}{V}\text{   (unit of Capacitance)}
(Units) Electric Field	\frac{V}{m}=\frac{N}{C}
(Units) Liters	1m^3=1ᴇ3\text{  }L
(Units) Newtons	N=kg\frac{m}{s^2}
	
(Formula) Coulomb's Law	F_E=k_e\frac{q_1q_2}{r^2}
(Formula) Force from Electric Field	F_E=qE_{@q}
(Formula) Electric Field	E=k_e\frac{q}{r^2}
(Formula) Electric Field at Center of Charged Finite Wire	E=\frac{kλL}{a}*\frac{1}{\sqrt{(\frac{L}{2})^2+a^2}}  \\ \text{a = distance from rod}
(Formula) Electric Field at Center of Charged Infinite Wire	E=\frac{2kλ}{a} \\ \text{a = distance from rod}
(Formula) Electric Field at Axis of Charged Ring	E=\frac{kQa}{(r^2+a^2)^\frac{3}{2}}  \\ \text{a = distance from center of ring} \\ \text{r = radius of the ring}
(Formula) Electric Field at Axis of Charged Disc	E=\frac{σ}{2Ɛ_0}[1-\frac{a}{\sqrt{r^2+a^2}}]  \\ \text{a = distance from center of disc} \\ \text{r = radius of the disc}
	
(Formula) Gauss' Law for Constant E at Constant angle to chosen surface	\text{(Electric Flux)   }ɸ=\vec{E}·\vec{A}=EAcosθ
(Formula) Gauss' Law Integration	ɸ=\int{\vec{E}·\vec{dA}}
(Formula) Gauss' Law for a Closed Surface	ɸ=\frac{Σq_{contained}}{Ɛ_0}
(Formula) Gauss' Law applied to an ideally chosen surface	EA=\frac{Σq_{contained}}{Ɛ_0}
(Formula) Electric Flux In a Parallel, but Varying Electric Field (eg a box in an electric field perpendicular to its top and bottom faces, but with different values for the top compared to the bottom)	ɸ=ɸ_{out}-ɸ_{in}
	
(Formula) Capacitor Charge and Voltage	Q=CV
(Formula) Electric Potential Energy stored in a Flat Plate Capacitor	U_E=\frac{1}{2}QV=\frac{1}{2}CV^2=\frac{1}{2}*\frac{Q^2}{C}
(Formula) Energy Density of a Flat Plate Capacitor	u=\frac{1}{2}Ɛ_0E^2
(Formula) Electric Field inside a Flat Plate Capacitor	E=\frac{σ}{Ɛ_0}=\frac{V}{d}
(Formula) Capacitance of a Flat Plate Capacitor	C=\frac{K_MƐ_0A}{d} \\ K_M\text{ = Capacitance constant of the dielectric (property of the material)} \\ \text{d = separation of the two plates} \\ \text{A = area of one of the plates}
(Formula) New Voltage After Inserting a Dielectric	V_f=\frac{V_0}{K_M} \\ K_M\text{ = Capacitance constant of the dielectric (property of the material)}
(Formula) New Capacitance After Inserting a Dielectric	C_f=K_MC_0 \\ K_M\text{ = Capacitance constant of the dielectric (property of the material)}
(Formula) Stuff about cylindrical capacitors, to be added	TBA
	
(Formula) Area of a Circle	A=πr^2
(Formula) Circumference of a Circle	C=2πr
(Formula) Area of a sphere	A=4πr^2
(Formula) Volume of a sphere	V=\frac{4}{3}πr^3
	
(Formula) Electric Potential at a given location (relative to infinitely far away) due to a point charge	V=k_e\frac{q}{r}
(Formula) Electric Potential due to a continuous charge (at a given point , relative to infinitely far away)	V=\int{k_e\frac{dq}{r}}
(Formula) Change in Voltage between two points A and B in a constant electric field	ΔV_{AB}=-Elcosθ
(Formula) Voltage at (any point on) the surface of a sphere	V=k_e\frac{Q}{R} \\ \text{R = radius of the sphere}
(Formula) Voltage at axis of charged ring  ?	V=k_eQ\frac{a}{(r^2+a^2)^{\frac{3}{2}}} \\ \text{a = distance from center of ring} \\ \text{r = radius of the ring}
(Formula) Voltage at axis of charged disc  ?	V=2πk_eσ \\ \text{a = distance from center of disc} \\ \text{r = radius of the disc}
(Formula) Voltage at a distance from the center of a finite charged rod ?	V=\frac{k_eQ}{L}\ln{\frac{L+\sqrt{a^2+L^2}}{a}} \\ \text{L = length of rod} \\ \text{a = distance from rod}
(Formula) Voltage inside sphere	V=\frac{k_eQ}{2R}(3-\frac{r^2}{R^2})\\ \text{R = radius of sphere}
	
(Formula) Change in Electric Potential Energy	ΔU_{AB}=U_A-U_B=-W_{AB}
(Formula) Change in Electric Potential Energy (integral)	ΔU_{AB}=-\int{Q\vec{E}·\vec{dL}}_A^B \\ \text{where L is the path taken between A and B}
(Formula) Work to move a charge across a voltage difference	W_{AB}=-qΔV_{AB}
(Formula) Electric potential energy of a charge at a point (with respect to that charge infinitely far away) with a given voltage (with respect to a point infinitely far away)	U_A=qV_A
(Formula) Potential Electric Energy of a collection of point charges	U_E=Σ_{i,j}k_e\frac{Q_iQ_j}{r_{i,j}} \\ Note: do not count a pair twice, eg as U_{1,2} and U_{2,1}
	
(Formula) Definition of work	W=Fd
(Formula) Kinetic energy	U_K=\frac{1}{2}mv^2
(Formula) displacement due to constant acceleration	d=v_0t+\frac{1}{2}at^2
(Formula) acceleration given two velocities and a distance	a=\frac{v_f^2-v_0^2}{2d}
`;

var cardsMasterOLD =[[String.raw`(Constants) Coulomb's Constant`, String.raw`k_e=8.99ᴇ9\frac{Nm^{2}}{C^{2}}`],
[String.raw`(Constants) Permittivity of Free Space`, String.raw`Ɛ_0=8.85ᴇ\text{ -}12\frac{C^{2}}{Nm^{2}}`],
[String.raw`(Constants) Elementary Charge`, String.raw`e=1.60ᴇ\text{ -}19\text{ }C`],
[String.raw`(Constants) Proton Mass`, String.raw`m_p=1.67ᴇ\text{ -}27\text{ }kg`],
[String.raw`(Constants) Electron Mass`, String.raw`m_e=9.11ᴇ\text{ -}31\text{ }kg`],
[String.raw`(Units) Farads`, String.raw`F=\frac{C}{V}\text{   (unit of Capacitance)}`],
[String.raw`(Units) Electric Field`, String.raw`\frac{V}{m}=\frac{N}{C}`],
[String.raw`(Units) Liters`, String.raw`1m^3=1ᴇ3\text{  }L`],
[String.raw`(Units) Newtons`, String.raw`N=kg\frac{m}{s^2}`],
[String.raw`(Formula) Coulomb's Law`, String.raw`F_E=k_e\frac{q_1q_2}{r^2}`],
[String.raw`(Formula) Force from Electric Field`, String.raw`F_E=qE_{@q}`],
[String.raw`(Formula) Electric Field`, String.raw`E=k_e\frac{q}{r^2}`],
[String.raw`(Formula) Electric Field at Center of Charged Finite Wire`, String.raw`E=\frac{kλL}{a}*\frac{1}{\sqrt{(\frac{L}{2})^2+a^2}}`],
[String.raw`(Formula) Electric Field at Center of Charged Infinite Wire`, String.raw`E=\frac{2kλ}{a}`],
[String.raw`(Formula) Electric Field at Axis of Charged Ring`, String.raw`E=\frac{kQa}{(r^2+a^2)^\frac{3}{2}}`],
[String.raw`(Formula) Electric Field at Axis of Charged Disc`, String.raw`E=\frac{σ}{2Ɛ_0}[1-\frac{a}{\sqrt{r^2+a^2}}]`],
[String.raw`(Formula) Gauss' Law for Constant E at Constant angle to chosen surface`, String.raw`\text{(Electric Flux)   }ɸ=\vec{E}·\vec{A}=EAcosθ`],
[String.raw`(Formula) Gauss' Law Integration`, String.raw`ɸ=\int{\vec{E}·\vec{dA}}`],
[String.raw`(Formula) Gauss' Law for a Closed Surface`, String.raw`ɸ=\frac{Σq_{contained}}{Ɛ_0}`],
[String.raw`(Formula) Gauss' Law applied to an ideally chosen surface`, String.raw`EA=\frac{Σq_{contained}}{Ɛ_0}`],
[String.raw`(Formula) Electric Flux In a Parallel, but Varying Electric Field`, String.raw`ɸ=ɸ_{out}-ɸ_{in}`],
[String.raw`(Formula) Coulomb's Law`, String.raw``]];
