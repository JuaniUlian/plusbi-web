"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Linkedin } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";


const teamMembers = [
    {
        name: 'Cristian Ulian',
        title: 'Co-Founder. Specialist in Public Policies and Local Development',
        avatar: 'https://picsum.photos/400/400?random=1',
        initials: 'CU',
        linkedin: '#',
        fullExperience: `
          <div class="space-y-4">
            <div>
              <h4 class="font-bold text-primary">academic background</h4>
              <ul class="list-disc pl-5 mt-2 space-y-1 text-sm text-muted-foreground">
                <li>🎓 Bachelor’s Degree in Political Science – <strong>Universidad Católica Argentina</strong></li>
                <li>🎓 Diploma in Local Development and Community Leadership – <strong>Histadrut Institute (Israel)</strong></li>
                <li>🎓 Diploma in Senior Social Management for Executives – <strong>Inter-American Development Bank (Washington D.C., USA)</strong></li>
                <li>🎓 Diploma in Project Cycle Management (PCM) Methodology – <strong>JICA (Japan International Cooperation Agency)</strong></li>
                <li>🌐 Diploma in International Negotiation – <strong>Ministry of Economy of Argentina</strong></li>
                <li>🎓 Specialization in Public Policies – <strong>Autonomous University of Barcelona</strong></li>
              </ul>
            </div>
            <div>
              <h4 class="font-bold text-primary">Professional Experience</h4>
               <ul class="list-disc pl-5 mt-2 space-y-1 text-sm text-muted-foreground">
                <li>🏛️ Legislative Advisor – <strong>Government of the Province of Entre Ríos</strong></li>
                <li>🤝 Coordinator of the Provincial Council for Social Policies – <strong>Ministry of Social Development of Entre Ríos</strong></li>
                <li>🌐 Director General of International Relations – <strong>Ministry of Production of Entre Ríos</strong></li>
                <li>🎓 Professor of Marketing and International Trade – <strong>Autonomous University of Entre Ríos</strong></li>
                <li>🏛️ Director of Youth Affairs – <strong>Government of the Province of Entre Ríos</strong></li>
              </ul>
            </div>
            <div>
              <h4 class="font-bold text-primary">Skills and Competences</h4>
               <ul class="list-disc pl-5 mt-2 space-y-1 text-sm text-muted-foreground">
                <li>🤝 <strong>Team Leadership</strong></li>
                <li>💡 <strong>Innovative Strategies</strong></li>
                <li>🏘️ <strong>Community Development</strong></li>
              </ul>
            </div>
          </div>
        `
    },
    {
        name: 'Juan Ignacio Ulian',
        title: 'CEO & Co-Founder: Bachelor in Political Science',
        avatar: 'https://picsum.photos/400/400?random=2',
        initials: 'JU',
        linkedin: '#',
        fullExperience: `
          <div class="space-y-4 text-sm text-muted-foreground">
            <p>🏅 I hold a Bachelor’s Degree in Political Science with a distinguished track record in both the <strong>sports and political spheres</strong>. My experience with the Argentine national athletics team reflects my commitment, discipline, and ability to perform under pressure, skills I now apply as the leader of PLUS BI, where I use my political science background to advise organizations and candidates on effective <strong>data-driven strategies</strong>.</p>
            <p>🌐 I have also worked with public institutions, international organizations, and civil society groups on <strong>social impact projects</strong>, gaining deep insight into social dynamics and the ability to design strategies that drive meaningful change.</p>
            <p>🤝 I am known for my ability to <strong>engage with diverse stakeholders</strong> and lead teams and initiatives successfully in complex environments, combining expertise in sports, politics, and social management to tackle challenges with a unique and effective perspective.</p>
            <div>
              <h4 class="font-bold text-primary mt-4">Professional Experience</h4>
               <ul class="list-disc pl-5 mt-2 space-y-1">
                <li>🏛️ Secretariat of Modernization of the State – <strong>Province of Entre Ríos</strong></li>
                <li>💼 Independent Contractor – <strong>UNDP (United Nations Development Programme)</strong></li>
                <li>📝 Consultant in Political Research and Analysis – <strong>OEI (Organization of Ibero-American States)</strong></li>
                <li>🤝 Institutional Strengthening Assistant – <strong>ENARD (National High Performance Sports Agency)</strong></li>
                <li>🌍 Volunteer – <strong>Scholas Occurrentes</strong></li>
                <li>📋 General Director of Projects – <strong>Fundación Puentes</strong></li>
              </ul>
            </div>
          </div>
        `
    },
    {
        name: 'Alejandro Gonzalez Carril',
        title: 'Political Expert. Graduate in International Relations and Political Sciences',
        avatar: 'https://picsum.photos/400/400?random=3',
        initials: 'AG',
        linkedin: '#',
        fullExperience: `
          <div class="space-y-4">
            <div>
              <h4 class="font-bold text-primary">Professional BACKGROUND</h4>
              <p class="text-sm text-muted-foreground mt-1">🎓 I am a professional with a double degree in <strong>Political Science and International Relations</strong>, with extensive experience in the public sector and political consulting. My work at the Directorate of International Relations of the Government of the Province of Entre Ríos has provided me with a deep understanding of governmental dynamics and international cooperation.</p>
              <p class="text-sm text-muted-foreground mt-1">🏅 Awarded a scholarship by COMCA in <strong>Public Goods Management</strong>, a program organized by the Government of South Korea and the Inter-American Development Bank (IDB), where I gained advanced knowledge in the efficient management of public resources.</p>
               <p class="text-sm text-muted-foreground mt-1">📣 I have participated in <strong>political communication and marketing consulting</strong> for two key presidential campaigns (2015 and 2023), contributing effective strategies to enhance the candidates’ presence and messaging in a highly competitive environment.</p>
            </div>
            <div>
              <h4 class="font-bold text-primary">Experience</h4>
               <ul class="list-disc pl-5 mt-2 space-y-1 text-sm text-muted-foreground">
                <li>🏛️ Technician at the <strong>Government of the Province of Entre Ríos</strong> – Directorate of International Relations</li>
                <li>📣 Political Communication and Marketing Consultant – <strong>2015 Presidential Campaign</strong></li>
                <li>📣 Political Communication and Marketing Consultant – <strong>2023 Presidential Campaign</strong></li>
              </ul>
            </div>
             <div>
              <h4 class="font-bold text-primary">Skills and abilities</h4>
               <ul class="list-disc pl-5 mt-2 space-y-1 text-sm text-muted-foreground">
                <li>🏛️ <strong>Public Policy</strong></li>
                <li>📊 <strong>Strategic Planning</strong></li>
                <li>💼 <strong>Business Strategy</strong></li>
                <li>🤝 <strong>Team Leadership</strong></li>
                <li>🗣️ <strong>Negotiation</strong></li>
              </ul>
            </div>
          </div>
        `
    },
     {
        name: 'Analía Barberio',
        title: 'CTO. Especialista en Sistemas de Información y Transformación Digital',
        avatar: 'https://picsum.photos/400/400?random=4',
        initials: 'AB',
        linkedin: '#',
        fullExperience: `
            <div class="space-y-2 text-sm text-muted-foreground">
                <p>Especialista en <strong>sistemas de información y transformación digital</strong>, con sólida trayectoria en la implementación de <strong>sistemas de gestión documental</strong> y <strong>ciberseguridad</strong> en entornos universitarios y organismos públicos.</p>
                <p><span class="font-semibold text-primary">Experiencia destacada:</span> Desarrollo <strong>SINTyS</strong>. Desarrollos para <strong>CAF, PNUD y BID</strong>. Certificadora <strong>ISO 9001 y 27001</strong>. Coordinadora de la Comisión de Ciberseguridad CIN.</p>
            </div>
        `
    },
     {
        name: 'Pablo Martinez',
        title: 'Chief Developer',
        avatar: 'https://picsum.photos/400/400?random=5',
        initials: 'PM',
        linkedin: '#',
        fullExperience: `
            <div class="space-y-2 text-sm text-muted-foreground">
                 <p>Desarrollador <strong>fullstack</strong> con énfasis en la <strong>transformación digital</strong> de procesos administrativos. Experto en integrar soluciones tecnológicas para agilizar y transparentar trámites en el sector público.</p>
                 <p><span class="font-semibold text-primary">Experiencia destacada:</span> Desarrollo <strong>SINTyS</strong>. Desarrollos para <strong>CAF, PNUD y BID</strong>.</p>
            </div>
        `
    }
];

export function TeamSection() {
  return (
    <Accordion type="single" collapsible className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {teamMembers.map((member) => (
        <AccordionItem key={member.name} value={member.name} className="border-none">
          <Card className="glassmorphism text-center overflow-hidden h-full flex flex-col">
            <div className="relative h-64 w-full">
              <Image
                src={member.avatar}
                alt={`Photo of ${member.name}`}
                fill
                style={{ objectFit: 'cover' }}
                data-ai-hint="profile picture"
              />
            </div>
            <CardContent className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-primary">{member.name}</h3>
                <p className="text-muted-foreground mt-1 flex-grow">{member.title}</p>
                <AccordionTrigger className="mt-4 text-sm text-primary hover:underline">Ver más</AccordionTrigger>
            </CardContent>
            <AccordionContent>
              <div className="p-6 pt-0 text-left">
                <div dangerouslySetInnerHTML={{ __html: member.fullExperience }} />
                 <div className="flex-shrink-0 pt-4 border-t mt-4">
                    <Button variant="link" asChild className="justify-start p-0 h-auto">
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin className="mr-2"/> Connect on LinkedIn</a>
                    </Button>
                </div>
              </div>
            </AccordionContent>
          </Card>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
