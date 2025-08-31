"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Linkedin } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

const teamMembers = [
    {
        name: 'Cristian Ulian',
        title: 'Specialist in Public Policies and Local Development',
        avatar: 'https://picsum.photos/400/400?random=1',
        initials: 'CU',
        linkedin: '#',
    },
    {
        name: 'Juan Ignacio Ulian',
        title: 'Bachelor in Political Science',
        avatar: 'https://picsum.photos/400/400?random=2',
        initials: 'JU',
        linkedin: '#',
    },
    {
        name: 'Alejandro Gonzalez Carril',
        title: 'Graduate in International Relations and Political Sciences',
        avatar: 'https://picsum.photos/400/400?random=3',
        initials: 'AG',
        linkedin: '#',
    },
     {
        name: 'Analía Barberio',
        title: 'Information Systems and Digital Transformation Specialist',
        avatar: 'https://picsum.photos/400/400?random=4',
        initials: 'AB',
        linkedin: '#',
    },
     {
        name: 'Pablo Martinez',
        title: 'Fullstack Developer',
        avatar: 'https://picsum.photos/400/400?random=5',
        initials: 'PM',
        linkedin: '#',
    }
];

export function TeamSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {teamMembers.map((member) => (
        <Card key={member.name} className="glassmorphism text-center overflow-hidden">
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
                 <Button variant="link" asChild className="mt-4">
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin className="mr-2"/> Connect</a>
                </Button>
            </CardContent>
        </Card>
      ))}
    </div>
  );
}
