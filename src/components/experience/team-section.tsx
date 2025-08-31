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
        title: 'Specialist in Public Policies and Local Development',
        avatar: 'https://picsum.photos/400/400?random=1',
        initials: 'CU',
        linkedin: '#',
        fullExperience: "Cristian has over 15 years of experience advising governments on public policy innovation. He specializes in creating sustainable development models and strengthening community engagement. His work has been recognized internationally for its impact on local governance."
    },
    {
        name: 'Juan Ignacio Ulian',
        title: 'Bachelor in Political Science',
        avatar: 'https://picsum.photos/400/400?random=2',
        initials: 'JU',
        linkedin: '#',
        fullExperience: "Juan Ignacio is an expert in political analysis and strategy. He has worked on multiple successful campaigns, providing data-driven insights and communication strategies. His focus is on understanding citizen needs to foster more responsive and effective governments."
    },
    {
        name: 'Alejandro Gonzalez Carril',
        title: 'Graduate in International Relations and Political Sciences',
        avatar: 'https://picsum.photos/400/400?random=3',
        initials: 'AG',
        linkedin: '#',
        fullExperience: "Alejandro brings a global perspective to the team, with experience in international cooperation and comparative politics. He has managed multi-stakeholder projects and is adept at navigating complex regulatory environments to achieve project goals."
    },
     {
        name: 'Analía Barberio',
        title: 'Information Systems and Digital Transformation Specialist',
        avatar: 'https://picsum.photos/400/400?random=4',
        initials: 'AB',
        linkedin: '#',
        fullExperience: "Analía leads our digital transformation initiatives. With a background in information systems engineering, she designs and implements technological solutions that modernize institutions, improve efficiency, and ensure data security. Her work is at the core of our GovTech solutions."
    },
     {
        name: 'Pablo Martinez',
        title: 'Fullstack Developer',
        avatar: 'https://picsum.photos/400/400?random=5',
        initials: 'PM',
        linkedin: '#',
        fullExperience: "Pablo is the architect behind our advanced applications. As a full-stack developer, he masters both front-end and back-end technologies to build robust, scalable, and user-friendly platforms. He is passionate about using technology to solve real-world problems."
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
