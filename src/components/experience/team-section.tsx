
"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Linkedin } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";
import { ScrollArea } from "../ui/scroll-area";


const teamContent = {
    es: {
        teamMembers: [
            {
                name: 'Cristian Ulian',
                title: 'Co-Fundador. Especialista en Políticas Públicas y Desarrollo Local',
                avatar: '/fotos/cristian.jpeg',
                linkedin: 'https://www.linkedin.com/in/cristian-uli%C3%A1n-223a8556/',
                fullExperience: `
                  <div class="space-y-4">
                    <div>
                      <h4 class="font-bold text-primary">Formación Académica</h4>
                      <ul class="list-disc pl-5 mt-2 space-y-1 text-sm text-muted-foreground">
                        <li>🎓 <strong>Licenciado en Ciencia Política</strong> – Universidad Católica Argentina</li>
                        <li>🎓 <strong>Diplomado en Desarrollo Local y Liderazgo Comunitario</strong> – Instituto Histadrut (Israel)</li>
                        <li>🎓 <strong>Diplomado en Alta Gerencia Social para Ejecutivos</strong> – Banco Interamericano de Desarrollo (Washington D.C., USA)</li>
                        <li>🎓 <strong>Diplomado en Metodología de Gestión del Ciclo de Proyectos (PCM)</strong> – JICA (Agencia de Cooperación Internacional de Japón)</li>
                        <li>🌐 <strong>Diplomado en Negociación Internacional</strong> – Ministerio de Economía de Argentina</li>
                        <li>🎓 <strong>Especialización en Políticas Públicas</strong> – Universidad Autónoma de Barcelona</li>
                      </ul>
                    </div>
                    <div>
                      <h4 class="font-bold text-primary">Experiencia Profesional</h4>
                       <ul class="list-disc pl-5 mt-2 space-y-1 text-sm text-muted-foreground">
                        <li>🏛️ <strong>Asesor Legislativo</strong> – Gobierno de la Provincia de Entre Ríos</li>
                        <li>🤝 <strong>Coordinador del Consejo Provincial de Políticas Sociales</strong> – Ministerio de Desarrollo Social de Entre Ríos</li>
                        <li>🌐 <strong>Director General de Relaciones Internacionales</strong> – Ministerio de Producción de Entre Ríos</li>
                        <li>🎓 <strong>Profesor de Marketing y Comercio Internacional</strong> – Universidad Autónoma de Entre Ríos</li>
                        <li>🏛️ <strong>Director de Asuntos de la Juventud</strong> – Gobierno de la Provincia de Entre Ríos</li>
                      </ul>
                    </div>
                    <div>
                      <h4 class="font-bold text-primary">Habilidades y Competencias</h4>
                       <ul class="list-disc pl-5 mt-2 space-y-1 text-sm text-muted-foreground">
                        <li>🤝 <strong>Liderazgo de Equipos</strong></li>
                        <li>💡 <strong>Estrategias Innovadoras</strong></li>
                        <li>🏘️ <strong>Desarrollo Comunitario</strong></li>
                      </ul>
                    </div>
                  </div>
                `
            },
            {
                name: 'Juan Ignacio Ulian',
                title: 'CEO & Co-Fundador. Licenciado en Ciencias Políticas',
                avatar: '/fotos/juan.jpg',
                linkedin: 'https://www.linkedin.com/in/juanulian/',
                fullExperience: `
                  <div class="space-y-4 text-sm text-muted-foreground">
                    <p>🏅 Soy <strong>Licenciado en Ciencia Política</strong> con una destacada trayectoria en los <strong>ámbitos deportivo y político</strong>. Mi experiencia en la selección argentina de atletismo refleja mi compromiso, disciplina y capacidad para rendir bajo presión, habilidades que ahora aplico como líder de PLUS BI, donde utilizo mis conocimientos en ciencia política para asesorar a organizaciones y candidatos en <strong>estrategias efectivas basadas en datos</strong>.</p>
                    <p>🌐 También he trabajado con instituciones públicas, organismos internacionales y organizaciones de la sociedad civil en <strong>proyectos de impacto social</strong>, adquiriendo un profundo conocimiento de las dinámicas sociales y la capacidad de diseñar estrategias que impulsen cambios significativos.</p>
                    <p>🤝 Soy reconocido por mi capacidad para <strong>relacionarme con diversos actores</strong> y liderar equipos e iniciativas con éxito en entornos complejos, combinando mi experiencia en deporte, política y gestión social para abordar desafíos con una perspectiva única y efectiva.</p>
                    <div>
                      <h4 class="font-bold text-primary mt-4">Experiencia Profesional</h4>
                       <ul class="list-disc pl-5 mt-2 space-y-1">
                        <li>🏛️ <strong>Secretaría de Modernización del Estado</strong> – Provincia de Entre Ríos</li>
                        <li>💼 <strong>Contratista Independiente</strong> – PNUD (Programa de las Naciones Unidas para el Desarrollo)</li>
                        <li>📝 <strong>Consultor en Investigación y Análisis Político</strong> – OEI (Organización de Estados Iberoamericanos)</li>
                        <li>🤝 <strong>Asistente de Fortalecimiento Institucional</strong> – ENARD (Ente Nacional de Alto Rendimiento Deportivo)</li>
                        <li>🌍 <strong>Voluntario</strong> – Scholas Occurrentes</li>
                        <li>📋 <strong>Director General de Proyectos</strong> – Fundación Puentes</li>
                      </ul>
                    </div>
                  </div>
                `
            }
        ],
        seeMore: "Ver más",
        connectLinkedin: "Conectar en LinkedIn"
    },
    en: {
        teamMembers: [
            {
                name: 'Cristian Ulian',
                title: 'Co-Founder. Specialist in Public Policies and Local Development',
                avatar: '/fotos/cristian.jpeg',
                linkedin: 'https://www.linkedin.com/in/cristian-uli%C3%A1n-223a8556/',
                fullExperience: `
                  <div class="space-y-4">
                    <div>
                      <h4 class="font-bold text-primary">Academic Background</h4>
                      <ul class="list-disc pl-5 mt-2 space-y-1 text-sm text-muted-foreground">
                        <li>🎓 <strong>Bachelor’s Degree in Political Science</strong> – Universidad Católica Argentina</li>
                        <li>🎓 <strong>Diploma in Local Development and Community Leadership</strong> – Histadrut Institute (Israel)</li>
                        <li>🎓 <strong>Diploma in Senior Social Management for Executives</strong> – Inter-American Development Bank (Washington D.C., USA)</li>
                        <li>🎓 <strong>Diploma in Project Cycle Management (PCM) Methodology</strong> – JICA (Japan International Cooperation Agency)</li>
                        <li>🌐 <strong>Diploma in International Negotiation</strong> – Ministry of Economy of Argentina</li>
                        <li>🎓 <strong>Specialization in Public Policies</strong> – Autonomous University of Barcelona</li>
                      </ul>
                    </div>
                    <div>
                      <h4 class="font-bold text-primary">Professional Experience</h4>
                       <ul class="list-disc pl-5 mt-2 space-y-1 text-sm text-muted-foreground">
                        <li>🏛️ <strong>Legislative Advisor</strong> – Government of the Province of Entre Ríos</li>
                        <li>🤝 <strong>Coordinator of the Provincial Council for Social Policies</strong> – Ministry of Social Development of Entre Ríos</li>
                        <li>🌐 <strong>Director General of International Relations</strong> – Ministry of Production of Entre Ríos</li>
                        <li>🎓 <strong>Professor of Marketing and International Trade</strong> – Autonomous University of Entre Ríos</li>
                        <li>🏛️ <strong>Director of Youth Affairs</strong> – Government of the Province of Entre Ríos</li>
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
                title: 'CEO & Co-Founder. Bachelor in Political Sciences',
                avatar: '/fotos/juan.jpg',
                linkedin: 'https://www.linkedin.com/in/juanulian/',
                fullExperience: `
                  <div class="space-y-4 text-sm text-muted-foreground">
                    <p>🏅 I hold a <strong>Bachelor’s Degree in Political Science</strong> with a distinguished track record in both the <strong>sports and political spheres</strong>. My experience with the Argentine national athletics team reflects my commitment, discipline, and ability to perform under pressure, skills I now apply as the leader of PLUS BI, where I use my political science background to advise organizations and candidates on effective <strong>data-driven strategies</strong>.</p>
                    <p>🌐 I have also worked with public institutions, international organizations, and civil society groups on <strong>social impact projects</strong>, gaining deep insight into social dynamics and the ability to design strategies that drive meaningful change.</p>
                    <p>🤝 I am known for my ability to <strong>engage with diverse stakeholders</strong> and lead teams and initiatives successfully in complex environments, combining expertise in sports, politics, and social management to tackle challenges with a unique and effective perspective.</p>
                    <div>
                      <h4 class="font-bold text-primary mt-4">Professional Experience</h4>
                       <ul class="list-disc pl-5 mt-2 space-y-1">
                        <li>🏛️ <strong>Secretariat of Modernization of the State</strong> – Province of Entre Ríos</li>
                        <li>💼 <strong>Independent Contractor</strong> – UNDP (United Nations Development Programme)</li>
                        <li>📝 <strong>Consultant in Political Research and Analysis</strong> – OEI (Organization of Ibero-American States)</li>
                        <li>🤝 <strong>Institutional Strengthening Assistant</strong> – ENARD (National High Performance Sports Agency)</li>
                        <li>🌍 <strong>Volunteer</strong> – Scholas Occurrentes</li>
                        <li>📋 <strong>General Director of Projects</strong> – Fundación Puentes</li>
                      </ul>
                    </div>
                  </div>
                `
            }
        ],
        seeMore: "See more",
        connectLinkedin: "Connect on LinkedIn"
    }
};

export function TeamSection() {
    const { language } = useLanguage();
    const c = teamContent[language];

  return (
    <Accordion type="single" collapsible className="w-full grid grid-cols-1 sm:grid-cols-2 gap-8">
      {c.teamMembers.map((member) => (
        <AccordionItem key={member.name} value={member.name} className="border-none">
          <Card className="glassmorphism text-center overflow-hidden h-full flex flex-col">
            <CardHeader>
                <div className="flex justify-center">
                    <Image
                        src={member.avatar}
                        alt={`Photo of ${member.name}`}
                        width={128}
                        height={128}
                        style={{ objectFit: 'cover' }}
                        data-ai-hint="profile picture"
                        className="rounded-full border-4 border-primary/20 size-32"
                    />
                </div>
                 <CardTitle className="mt-4">{member.name}</CardTitle>
                 <p className="text-muted-foreground mt-1 flex-grow">{member.title}</p>
            </CardHeader>
            <CardContent className="p-6 flex flex-col flex-grow items-center">
                <AccordionTrigger className="mt-auto text-sm text-primary hover:underline">{c.seeMore}</AccordionTrigger>
            </CardContent>
            <AccordionContent>
              <div className="p-6 pt-0 text-left">
                <ScrollArea className="h-72 w-full pr-4">
                    <div dangerouslySetInnerHTML={{ __html: member.fullExperience }} />
                </ScrollArea>
                 <div className="flex-shrink-0 pt-4 border-t mt-4">
                    <Button variant="link" asChild className="justify-start p-0 h-auto">
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin className="mr-2"/> {c.connectLinkedin}</a>
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
