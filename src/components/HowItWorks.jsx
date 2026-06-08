import { Link } from 'react-router-dom';
import { FileText, Inbox, CheckCircle2, UserPlus, Briefcase, Send } from 'lucide-react';
import Container from './ui/Container';
import SectionHeading from './ui/SectionHeading';

const customerSteps = [
  { icon: FileText, title: 'Përshkruaj problemin', text: 'Zgjidh shërbimin, zonën dhe shkruaj çfarë të duhet. Zgjon vetëm 2 minuta.' },
  { icon: Inbox, title: 'Merr oferta nga profesionistët', text: 'Profesionistë të verifikuar dërgojnë oferta me çmim dhe kohë ardhjeje.' },
  { icon: CheckCircle2, title: 'Zgjidh dhe realizo shërbimin', text: 'Krahaso vlerësimet dhe çmimet, zgjidh profesionistin dhe lër një review.' },
];

const proSteps = [
  { icon: UserPlus, title: 'Regjistro profilin', text: 'Plotëso profilin dhe dërgoje për verifikim. Pas aprovimit fillon menjëherë.' },
  { icon: Briefcase, title: 'Shiko punët e disponueshme', text: 'Akses në kërkesa reale nga klientë në zonën tënde të Tiranës.' },
  { icon: Send, title: 'Dërgo oferta dhe fito punë', text: 'Dërgo ofertën tënde, fito besimin e klientit dhe ndërto reputacionin.' },
];

function Steps({ steps, accent }) {
  return (
    <div className="relative grid gap-6 sm:grid-cols-3">
      {steps.map((s, i) => (
        <div key={s.title} className="relative">
          <div className="card h-full p-6">
            <div className="flex items-center justify-between">
              <span className={`grid h-12 w-12 place-items-center rounded-2xl ${accent === 'amber' ? 'bg-amber-50 text-amber-600' : 'bg-navy-50 text-navy-700'}`}>
                <s.icon className="h-6 w-6" />
              </span>
              <span className="text-3xl font-extrabold text-navy-100">{i + 1}</span>
            </div>
            <h4 className="mt-4 text-base font-bold text-navy-900">{s.title}</h4>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{s.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section className="section">
      <Container>
        <SectionHeading
          eyebrow="Si Funksionon"
          title="Një proces i thjeshtë për të dyja palët"
          subtitle="Pa komplikime — qoftë kur kërkon një shërbim, qoftë kur ofron shërbimin tënd."
        />
        <div className="mt-12 space-y-12">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="chip bg-amber-100 text-amber-800">Për klientët</span>
              <span className="text-sm text-slate-500">Gjej profesionistin e duhur në 3 hapa</span>
            </div>
            <Steps steps={customerSteps} accent="amber" />
            <div className="mt-6">
              <Link to="/request" className="btn-primary">Kërko Shërbim</Link>
            </div>
          </div>

          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="chip bg-navy-100 text-navy-800">Për profesionistët</span>
              <span className="text-sm text-slate-500">Fito punë të reja në 3 hapa</span>
            </div>
            <Steps steps={proSteps} accent="navy" />
            <div className="mt-6">
              <Link to="/register/professional" className="btn-navy">Regjistrohu si Profesionist</Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
