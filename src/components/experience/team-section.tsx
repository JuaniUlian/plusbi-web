"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Linkedin } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "../ui/scroll-area";


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
                <li>🎓 Bachelor’s Degree in Political Science – Universidad Católica Argentina</li>
                <li>🎓 Diploma in Local Development and Community Leadership – Histadrut Institute (Israel)</li>
                <li>🎓 Diploma in Senior Social Management for Executives – Inter-American Development Bank (Washington D.C., USA)</li>
                <li>🎓 Diploma in Project Cycle Management (PCM) Methodology – JICA (Japan International Cooperation Agency)</li>
                <li>🌐 Diploma in International Negotiation – Ministry of Economy of Argentina</li>
                <li>🎓 Specialization in Public Policies – Autonomous University of Barcelona</li>
              </ul>
            </div>
            <div>
              <h4 class="font-bold text-primary">Professional Experience</h4>
               <ul class="list-disc pl-5 mt-2 space-y-1 text-sm text-muted-foreground">
                <li>🏛️ Legislative Advisor – Government of the Province of Entre Ríos</li>
                <li>🤝 Coordinator of the Provincial Council for Social Policies – Ministry of Social Development of Entre Ríos</li>
                <li>🌐 Director General of International Relations – Ministry of Production of Entre Ríos</li>
                <li>🎓 Professor of Marketing and International Trade – Autonomous University of Entre Ríos</li>
                <li>🏛️ Director of Youth Affairs – Government of the Province of Entre Ríos</li>
              </ul>
            </div>
            <div>
              <h4 class="font-bold text-primary">Skills and Competences</h4>
               <ul class="list-disc pl-5 mt-2 space-y-1 text-sm text-muted-foreground">
                <li>🤝 Team Leadership</li>
                <li>💡 Innovative Strategies</li>
                <li>🏘️ Community Development</li>
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
            <p>🏅 I hold a Bachelor’s Degree in Political Science with a distinguished track record in both the sports and political spheres. My experience with the Argentine national athletics team reflects my commitment, discipline, and ability to perform under pressure, skills I now apply as the leader of PLUS BI, where I use my political science background to advise organizations and candidates on effective data-driven strategies.</p>
            <p>🌐 I have also worked with public institutions, international organizations, and civil society groups on social impact projects, gaining deep insight into social dynamics and the ability to design strategies that drive meaningful change.</p>
            <p>🤝 I am known for my ability to engage with diverse stakeholders and lead teams and initiatives successfully in complex environments, combining expertise in sports, politics, and social management to tackle challenges with a unique and effective perspective.</p>
            <div>
              <h4 class="font-bold text-primary mt-4">Professional Experience</h4>
               <ul class="list-disc pl-5 mt-2 space-y-1">
                <li>🏛️ Secretariat of Modernization of the State – Province of Entre Ríos</li>
                <li>💼 Independent Contractor – UNDP (United Nations Development Programme)</li>
                <li>📝 Consultant in Political Research and Analysis – OEI (Organization of Ibero-American States)</li>
                <li>🤝 Institutional Strengthening Assistant – ENARD (National High Performance Sports Agency)</li>
                <li>🌍 Volunteer – Scholas Occurrentes</li>
                <li>📋 General Director of Projects – Fundación Puentes</li>
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
              <p class="text-sm text-muted-foreground mt-1">🎓 I am a professional with a double degree in Political Science and International Relations, with extensive experience in the public sector and political consulting. My work at the Directorate of International Relations of the Government of the Province of Entre Ríos has provided me with a deep understanding of governmental dynamics and international cooperation.</p>
              <p class="text-sm text-muted-foreground mt-1">🏅 Awarded a scholarship by COMCA in Public Goods Management, a program organized by the Government of South Korea and the Inter-American Development Bank (IDB), where I gained advanced knowledge in the efficient management of public resources.</p>
               <p class="text-sm text-muted-foreground mt-1">📣 I have participated in political communication and marketing consulting for two key presidential campaigns (2015 and 2023), contributing effective strategies to enhance the candidates’ presence and messaging in a highly competitive environment.</p>
            </div>
            <div>
              <h4 class="font-bold text-primary">Experience</h4>
               <ul class="list-disc pl-5 mt-2 space-y-1 text-sm text-muted-foreground">
                <li>🏛️ Technician at the Government of the Province of Entre Ríos – Directorate of International Relations</li>
                <li>📣 Political Communication and Marketing Consultant – 2015 Presidential Campaign</li>
                <li>📣 Political Communication and Marketing Consultant – 2023 Presidential Campaign</li>
              </ul>
            </div>
             <div>
              <h4 class="font-bold text-primary">Skills and abilities</h4>
               <ul class="list-disc pl-5 mt-2 space-y-1 text-sm text-muted-foreground">
                <li>🏛️ Public Policy</li>
                <li>📊 Strategic Planning</li>
                <li>💼 Business Strategy</li>
                <li>🤝 Team Leadership</li>
                <li>🗣️ Negotiation</li>
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
                <p>Especialista en sistemas de información y transformación digital, con sólida trayectoria en la implementación de sistemas de gestión documental y ciberseguridad en entornos universitarios y organismos públicos.</p>
                <p><span class="font-semibold text-primary">Experiencia destacada:</span> Desarrollo SINTyS. Desarrollos para CAF, PNUD y BID. Certificadora ISO 9001 y 27001. Coordinadora de la Comisión de Ciberseguridad CIN.</p>
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
                 <p>Desarrollador fullstack con énfasis en la transformación digital de procesos administrativos. Experto en integrar soluciones tecnológicas para agilizar y transparentar trámites en el sector público.</p>
                 <p><span class="font-semibold text-primary">Experiencia destacada:</span> Desarrollo SINTyS. Desarrollos para CAF, PNUD y BID.</p>
            </div>
        `
    }
];

export function TeamSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {teamMembers.map((member) => (
         <Dialog key={member.name}>
            <DialogTrigger asChild>
                <Card className="glassmorphism text-center overflow-hidden cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                    <div className="relative h-64 w-full">
                        <Image 
                            src={member.avatar} 
                            alt={`Photo of ${member.name}`}
                            fill
                            style={{objectFit: 'cover'}}
                            data-ai-hint="profile picture" 
                        />
                    </div>
                    <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-primary">{member.name}</h3>
                        <p className="text-muted-foreground mt-1">{member.title}</p>
                    </CardContent>
                </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-2xl glassmorphism flex flex-col max-h-[90vh]">
                 <DialogHeader className="flex-shrink-0">
                    <div className="flex items-center gap-4">
                        <Avatar className="size-16">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                            <DialogTitle className="text-2xl">{member.name}</DialogTitle>
                            <DialogDescription>{member.title}</DialogDescription>
                        </div>
                    </div>
                </DialogHeader>
                <ScrollArea className="flex-grow">
                    <div className="py-4 pr-6" dangerouslySetInnerHTML={{ __html: member.fullExperience }} />
                </ScrollArea>
                 <div className="flex-shrink-0 pt-4 border-t">
                    <Button variant="link" asChild className="justify-start p-0 h-auto">
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin className="mr-2"/> Connect on LinkedIn</a>
                    </Button>
                </div>
            </DialogContent>
         </Dialog>
      ))}
    </div>
  );
}

    