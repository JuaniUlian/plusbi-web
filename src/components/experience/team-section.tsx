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


const teamMembers = [
    {
        name: 'Cristian Ulian',
        title: 'Especialista en Políticas Públicas y Desarrollo Local',
        avatar: 'https://picsum.photos/400/400?random=1',
        initials: 'CU',
        linkedin: '#',
        fullExperience: `
          <div class="space-y-4">
            <div>
              <h4 class="font-bold text-primary">Formación Académica</h4>
              <ul class="list-disc pl-5 mt-2 space-y-1 text-sm text-muted-foreground">
                <li>Licenciado en Ciencia Política – Universidad Católica Argentina</li>
                <li>Diplomado en Desarrollo Local y Liderazgo Comunitario – Instituto Histadrut (Israel)</li>
                <li>Diplomado en Alta Gerencia Social para Ejecutivos – Banco Interamericano de Desarrollo (Washington D.C., USA)</li>
                <li>Diplomado en Metodología de Ciclo de Proyectos (PCM) – JICA (Agencia de Cooperación Internacional de Japón)</li>
                <li>Diplomado en Negociación Internacional – Ministerio de Economía de Argentina</li>
                <li>Especialización en Políticas Públicas – Universidad Autónoma de Barcelona</li>
              </ul>
            </div>
            <div>
              <h4 class="font-bold text-primary">Experiencia Profesional</h4>
               <ul class="list-disc pl-5 mt-2 space-y-1 text-sm text-muted-foreground">
                <li>Asesor Legislativo – Gobierno de la Provincia de Entre Ríos</li>
                <li>Coordinador del Consejo Provincial de Políticas Sociales – Ministerio de Desarrollo Social de Entre Ríos</li>
                <li>Director General de Relaciones Internacionales – Ministerio de Producción de Entre Ríos</li>
                <li>Profesor de Marketing y Comercio Internacional – Universidad Autónoma de Entre Ríos</li>
                <li>Director de Asuntos de la Juventud – Gobierno de la Provincia de Entre Ríos</li>
              </ul>
            </div>
            <div>
              <h4 class="font-bold text-primary">Habilidades y Competencias</h4>
               <ul class="list-disc pl-5 mt-2 space-y-1 text-sm text-muted-foreground">
                <li>Liderazgo de Equipos</li>
                <li>Estrategias Innovadoras</li>
                <li>Desarrollo Comunitario</li>
              </ul>
            </div>
          </div>
        `
    },
    {
        name: 'Juan Ignacio Ulian',
        title: 'CEO & Co-Founder: Licenciado en Ciencia Política',
        avatar: 'https://picsum.photos/400/400?random=2',
        initials: 'JU',
        linkedin: '#',
        fullExperience: `
          <div class="space-y-4 text-sm text-muted-foreground">
            <p>🏅 Licenciado en Ciencia Política con una destacada trayectoria tanto en el ámbito deportivo como político. Mi experiencia en la selección argentina de atletismo refleja mi compromiso, disciplina y capacidad para rendir bajo presión, habilidades que ahora aplico como líder de PLUS BI, donde utilizo mi formación en ciencia política para asesorar a organizaciones y candidatos en estrategias efectivas basadas en datos.</p>
            <p>🌐 También he trabajado con instituciones públicas, organismos internacionales y organizaciones de la sociedad civil en proyectos de impacto social, obteniendo un profundo conocimiento de las dinámicas sociales y la capacidad de diseñar estrategias que impulsen un cambio significativo.</p>
            <p>🤝 Soy conocido por mi habilidad para relacionarme con diversos stakeholders y liderar equipos e iniciativas con éxito en entornos complejos, combinando mi experiencia en deportes, política y gestión social para abordar los desafíos con una perspectiva única y efectiva.</p>
            <div>
              <h4 class="font-bold text-primary mt-4">Experiencia Profesional</h4>
               <ul class="list-disc pl-5 mt-2 space-y-1">
                <li>Secretaría de Modernización del Estado – Provincia de Entre Ríos</li>
                <li>Contratista Independiente – PNUD (Programa de las Naciones Unidas para el Desarrollo)</li>
                <li>Consultor en Investigación y Análisis Político – OEI (Organización de Estados Iberoamericanos)</li>
                <li>Asistente de Fortalecimiento Institucional – ENARD (Ente Nacional de Alto Rendimiento Deportivo)</li>
                <li>Voluntario – Scholas Occurrentes</li>
                <li>Director General de Proyectos – Fundación Puentes</li>
              </ul>
            </div>
          </div>
        `
    },
    {
        name: 'Alejandro Gonzalez Carril',
        title: 'Experto Político. Licenciado en Relaciones Internacionales y Ciencias Políticas',
        avatar: 'https://picsum.photos/400/400?random=3',
        initials: 'AG',
        linkedin: '#',
        fullExperience: `
          <div class="space-y-4">
            <div>
              <h4 class="font-bold text-primary">Perfil Profesional</h4>
              <p class="text-sm text-muted-foreground mt-1">🎓 Profesional con doble titulación en Ciencia Política y Relaciones Internacionales, con amplia experiencia en el sector público y consultoría política. Mi trabajo en la Dirección de Relaciones Internacionales del Gobierno de la Provincia de Entre Ríos me ha proporcionado un profundo conocimiento de la dinámica gubernamental y la cooperación internacional.</p>
              <p class="text-sm text-muted-foreground mt-1">🏅 Becado por COMCA en Gestión de Bienes Públicos, programa organizado por el Gobierno de Corea del Sur y el Banco Interamericano de Desarrollo (BID), donde adquirí conocimientos avanzados en la gestión eficiente de los recursos públicos.</p>
               <p class="text-sm text-muted-foreground mt-1">📣 He participado en consultoría de comunicación y marketing político para dos campañas presidenciales clave (2015 y 2023), aportando estrategias efectivas para potenciar la presencia y el mensaje de los candidatos en un entorno altamente competitivo.</p>
            </div>
            <div>
              <h4 class="font-bold text-primary">Experiencia</h4>
               <ul class="list-disc pl-5 mt-2 space-y-1 text-sm text-muted-foreground">
                <li>Técnico en el Gobierno de la Provincia de Entre Ríos – Dirección de Relaciones Internacionales</li>
                <li>Consultor de Comunicación y Marketing Político – Campaña Presidencial 2015</li>
                <li>Consultor de Comunicación y Marketing Político – Campaña Presidencial 2023</li>
              </ul>
            </div>
             <div>
              <h4 class="font-bold text-primary">Habilidades y Competencias</h4>
               <ul class="list-disc pl-5 mt-2 space-y-1 text-sm text-muted-foreground">
                <li>Política Pública</li>
                <li>Planificación Estratégica</li>
                <li>Estrategia Empresarial</li>
                <li>Liderazgo de Equipos</li>
                <li>Negociación</li>
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
                <p><span class="font-semibold text-primary">Experiencia destacada:</span> Desarrollo SINTyS y SUDOCU. Desarrollos para CAF, PNUD y BID. Certificadora ISO 9001 y 27001. Coordinadora de la Comisión de Ciberseguridad CIN.</p>
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
                 <p><span class="font-semibold text-primary">Experiencia destacada:</span> Desarrollo SINTyS y SUDOCU. Desarrollos para CAF, PNUD y BID.</p>
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
            <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-2xl glassmorphism">
                <DialogHeader>
                    <DialogTitle className="text-2xl">{member.name}</DialogTitle>
                    <DialogDescription>{member.title}</DialogDescription>
                </DialogHeader>
                <div className="py-4" dangerouslySetInnerHTML={{ __html: member.fullExperience }} />
                 <Button variant="link" asChild className="mt-4 justify-start p-0 h-auto">
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin className="mr-2"/> Connect on LinkedIn</a>
                </Button>
            </DialogContent>
         </Dialog>
      ))}
    </div>
  );
}
