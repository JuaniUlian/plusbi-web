"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Linkedin } from "lucide-react";
import { Button } from "../ui/button";

const teamMembers = [
    {
        name: 'Cristian Ulian',
        title: 'Specialist in Public Policies and Local Development',
        avatar: 'https://picsum.photos/100/100?random=1',
        initials: 'CU',
        content: (
            <div>
                <h4 className="font-semibold mb-2">Academic Background</h4>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li>🎓 Bachelor’s Degree in Political Science – Universidad Católica Argentina</li>
                    <li>🎓 Diploma in Local Development and Community Leadership – Histadrut Institute (Israel)</li>
                    <li>🎓 Diploma in Senior Social Management for Executives – Inter-American Development Bank (Washington D.C., USA)</li>
                    <li>🎓 Diploma in Project Cycle Management (PCM) Methodology – JICA (Japan International Cooperation Agency)</li>
                    <li>🌐 Diploma in International Negotiation – Ministry of Economy of Argentina</li>
                    <li>🎓 Specialization in Public Policies – Autonomous University of Barcelona</li>
                </ul>
                <h4 className="font-semibold mt-4 mb-2">Professional Experience</h4>
                <p className="text-muted-foreground mb-2">I have worked with public agencies, international agencies and civil society organisations, which has given me a deep understanding of social and economic dynamics.</p>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li>🏛️ Legislative Advisor – Government of the Province of Entre Ríos</li>
                    <li>🤝 Coordinator of the Provincial Council for Social Policies – Ministry of Social Development of Entre Ríos</li>
                    <li>🌐 Director General of International Relations – Ministry of Production of Entre Ríos</li>
                    <li>🎓 Professor of Marketing and International Trade – Autonomous University of Entre Ríos</li>
                    <li>🏛️ Director of Youth Affairs – Government of the Province of Entre Ríos</li>
                </ul>
                <Button variant="link" asChild className="mt-4 -ml-4">
                    <a href="#" target="_blank" rel="noopener noreferrer"><Linkedin className="mr-2"/> Connect on LinkedIn</a>
                </Button>
            </div>
        )
    },
    {
        name: 'Juan Ignacio Ulian',
        title: 'Bachelor in Political Science',
        avatar: 'https://picsum.photos/100/100?random=2',
        initials: 'JU',
        content: (
            <div>
                <p className="text-muted-foreground mb-4">🏅 I hold a Bachelor’s Degree in Political Science with a distinguished track record in both the sports and political spheres. My experience with the Argentine national athletics team reflects my commitment, discipline, and ability to perform under pressure, skills I now apply as the leader of PLUS BI, where I use my political science background to advise organizations and candidates on effective data-driven strategies.</p>
                <p className="text-muted-foreground mb-4">🌐 I have also worked with public institutions, international organizations, and civil society groups on social impact projects, gaining deep insight into social dynamics and the ability to design strategies that drive meaningful change.</p>
                 <h4 className="font-semibold mt-4 mb-2">Professional Experience</h4>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li>🏛️ Secretariat of Modernization of the State – Province of Entre Ríos</li>
                    <li>💼 Independent Contractor – UNDP (United Nations Development Programme)</li>
                    <li>📝 Consultant in Political Research and Analysis – OEI (Organization of Ibero-American States)</li>
                    <li>🤝 Institutional Strengthening Assistant – ENARD (National High Performance Sports Agency)</li>
                    <li>🌍 Volunteer – Scholas Occurrentes</li>
                    <li>📋 General Director of Projects – Fundación Puentes</li>
                </ul>
            </div>
        )
    },
    {
        name: 'Alejandro Gonzalez Carril',
        title: 'Graduate in International Relations and Political Sciences',
        avatar: 'https://picsum.photos/100/100?random=3',
        initials: 'AG',
        content: (
             <div>
                <p className="text-muted-foreground mb-4">🎓 I am a professional with a double degree in Political Science and International Relations, with extensive experience in the public sector and political consulting. My work at the Directorate of International Relations of the Government of the Province of Entre Ríos has provided me with a deep understanding of governmental dynamics and international cooperation.</p>
                <p className="text-muted-foreground mb-4">🏅 Awarded a scholarship by COMCA in Public Goods Management, a program organized by the Government of South Korea and the Inter-American Development Bank (IDB), where I gained advanced knowledge in the efficient management of public resources.</p>
                <p className="text-muted-foreground mb-4">📣 I have participated in political communication and marketing consulting for two key presidential campaigns (2015 and 2023), contributing effective strategies to enhance the candidates’ presence and messaging in a highly competitive environment.</p>
                 <h4 className="font-semibold mt-4 mb-2">Experience</h4>
                 <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li>🏛️ Technician at the Government of the Province of Entre Ríos – Directorate of International Relations</li>
                    <li>📣 Political Communication and Marketing Consultant – 2015 Presidential Campaign</li>
                    <li>📣 Political Communication and Marketing Consultant – 2023 Presidential Campaign</li>
                 </ul>
            </div>
        )
    },
     {
        name: 'Analía Barberio',
        title: 'Information Systems and Digital Transformation Specialist',
        avatar: 'https://picsum.photos/100/100?random=4',
        initials: 'AB',
        content: (
             <div>
                <p className="text-muted-foreground mb-4">Especialista en sistemas de información y transformación digital, con sólida trayectoria en la implementación de sistemas de gestión documental y ciberseguridad en entornos universitarios y organismos públicos.</p>
                 <h4 className="font-semibold mt-4 mb-2">Experiencia destacada</h4>
                 <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li>Desarrollo SINTyS y SUDOCU.</li>
                    <li>Desarrollos para CAF, PNUD y BID.</li>
                    <li>Certificadora ISO 9001 y 27001.</li>
                    <li>Coordinadora de la Comisión de Ciberseguridad CIN.</li>
                 </ul>
            </div>
        )
    },
     {
        name: 'Pablo Martinez',
        title: 'Fullstack Developer',
        avatar: 'https://picsum.photos/100/100?random=5',
        initials: 'PM',
        content: (
             <div>
                <p className="text-muted-foreground mb-4">Desarrollador fullstack con énfasis en la transformación digital de procesos administrativos. Experto en integrar soluciones tecnológicas para agilizar y transparentar trámites en el sector público.</p>
                 <h4 className="font-semibold mt-4 mb-2">Experiencia destacada</h4>
                 <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li>Desarrollo SINTyS y SUDOCU.</li>
                    <li>Desarrollos para CAF, PNUD y BID.</li>
                 </ul>
            </div>
        )
    }
];

export function TeamSection() {
  return (
    <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto">
      {teamMembers.map((member) => (
        <AccordionItem key={member.name} value={member.name} className="border-b">
          <AccordionTrigger className="py-6 text-left hover:no-underline">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={member.avatar} alt={member.name} data-ai-hint="profile picture" />
                <AvatarFallback>{member.initials}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-muted-foreground">{member.title}</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-6 bg-background rounded-b-lg">
            {member.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
