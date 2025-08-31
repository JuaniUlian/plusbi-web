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
        fullExperience: "Cristian tiene más de 15 años de experiencia asesorando a gobiernos en innovación de políticas públicas. Se especializa en la creación de modelos de desarrollo sostenible y en el fortalecimiento de la participación comunitaria. Su trabajo ha sido reconocido internacionalmente por su impacto en la gobernanza local."
    },
    {
        name: 'Juan Ignacio Ulian',
        title: 'Licenciado en Ciencia Política',
        avatar: 'https://picsum.photos/400/400?random=2',
        initials: 'JU',
        linkedin: '#',
        fullExperience: "Juan Ignacio es un experto en análisis y estrategia política. Ha trabajado en múltiples campañas exitosas, proporcionando conocimientos basados en datos y estrategias de comunicación. Su enfoque es comprender las necesidades de los ciudadanos para fomentar gobiernos más receptivos y eficaces."
    },
    {
        name: 'Alejandro Gonzalez Carril',
        title: 'Licenciado en Relaciones Internacionales y Ciencias Políticas',
        avatar: 'https://picsum.photos/400/400?random=3',
        initials: 'AG',
        linkedin: '#',
        fullExperience: "Alejandro aporta una perspectiva global al equipo, con experiencia en cooperación internacional y política comparada. Ha gestionado proyectos con múltiples partes interesadas y es experto en navegar por entornos regulatorios complejos para alcanzar los objetivos del proyecto."
    },
     {
        name: 'Analía Barberio',
        title: 'Especialista en Sistemas de Información y Transformación Digital',
        avatar: 'https://picsum.photos/400/400?random=4',
        initials: 'AB',
        linkedin: '#',
        fullExperience: "Analía lidera nuestras iniciativas de transformación digital. Con una formación en ingeniería de sistemas de información, diseña e implementa soluciones tecnológicas que modernizan las instituciones, mejoran la eficiencia y garantizan la seguridad de los datos. Su trabajo está en el núcleo de nuestras soluciones GovTech."
    },
     {
        name: 'Pablo Martinez',
        title: 'Desarrollador Fullstack',
        avatar: 'https://picsum.photos/400/400?random=5',
        initials: 'PM',
        linkedin: '#',
        fullExperience: "Pablo es el arquitecto detrás de nuestras aplicaciones avanzadas. Como desarrollador full-stack, domina tanto las tecnologías de front-end como de back-end para construir plataformas robustas, escalables y fáciles de usar. Le apasiona usar la tecnología para resolver problemas del mundo real."
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
            <DialogContent className="sm:max-w-[425px] glassmorphism">
                <DialogHeader>
                    <DialogTitle className="text-2xl">{member.name}</DialogTitle>
                    <DialogDescription>{member.title}</DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <p className="text-sm text-muted-foreground">
                        {member.fullExperience}
                    </p>
                </div>
                 <Button variant="link" asChild className="mt-4 justify-start p-0 h-auto">
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin className="mr-2"/> Connect on LinkedIn</a>
                </Button>
            </DialogContent>
         </Dialog>
      ))}
    </div>
  );
}
