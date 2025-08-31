
"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { recommendProduct } from "@/app/actions";
import type { ProductRecommendationOutput } from "@/ai/flows/product-recommendation-wizard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Lightbulb, Send, User, Mail, MessageSquare, Search } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { useLanguage } from "@/contexts/language-context";

const content = {
  es: {
    wizardSchema: z.object({
      need: z.string().min(10, "Por favor, describe tus necesidades en pocas palabras."),
    }),
    contactSchema: z.object({
      name: z.string().min(2, "El nombre es requerido."),
      email: z.string().email("Dirección de correo electrónico inválida."),
      message: z.string().optional(),
    }),
    placeholderTexts: [
        "Necesito automatizar la validación de documentos legales",
        "¿Cómo puedo analizar grandes volúmenes de datos?",
        "Quiero digitalizar mis procesos en papel",
        "Necesitamos mejorar nuestros sistemas de control interno",
    ],
    staticPlaceholder: "Cuéntanos qué necesitas...",
    getRecommendation: "Obtener Recomendación",
    ideas: "Algunas ideas:",
    ideasText: "¿Cuál es tu objetivo principal? ¿Cuál es tu desafío actual?",
    errorTitle: "Error",
    errorDescription: "No se pudo obtener una recomendación. Por favor, inténtalo de nuevo.",
    aiRecommendation: "Recomendación de IA",
    basedOnNeeds: "Basado en tus necesidades, aquí está nuestra sugerencia.",
    interested: "¿Interesado? Contáctanos",
    startOver: "Empezar de Nuevo",
    contactUs: "Contáctanos",
    contactAbout: "Hablemos sobre cómo",
    contactHelp: "puede ayudarte. Por favor, proporciona tus datos de contacto.",
    yourName: "Tu Nombre",
    yourEmail: "Tu Email",
    optionalMessage: "Mensaje opcional...",
    sendMessage: "Enviar Mensaje",
    back: "Volver",
    thankYou: "¡Gracias!",
    messageSent: "Tu mensaje ha sido enviado. Nos pondremos en contacto contigo en breve."
  },
  en: {
    wizardSchema: z.object({
      need: z.string().min(10, "Please describe your needs in a few words."),
    }),
    contactSchema: z.object({
      name: z.string().min(2, "Name is required."),
      email: z.string().email("Invalid email address."),
      message: z.string().optional(),
    }),
    placeholderTexts: [
        "I need to automate legal document validation",
        "How can I analyze large volumes of data?",
        "I want to digitize my paper-based processes",
        "We need to improve our internal control systems",
    ],
    staticPlaceholder: "Tell us what you need...",
    getRecommendation: "Get Recommendation",
    ideas: "Some ideas:",
    ideasText: "What is your main goal? What is your current challenge?",
    errorTitle: "Error",
    errorDescription: "Could not get a recommendation. Please try again.",
    aiRecommendation: "AI Recommendation",
    basedOnNeeds: "Based on your needs, here is our suggestion.",
    interested: "Interested? Contact Us",
    startOver: "Start Over",
    contactUs: "Contact Us",
    contactAbout: "Let's talk about how",
    contactHelp: "can help you. Please provide your contact details.",
    yourName: "Your Name",
    yourEmail: "Your Email",
    optionalMessage: "Optional message...",
    sendMessage: "Send Message",
    back: "Back",
    thankYou: "Thank you!",
    messageSent: "Your message has been sent. We will contact you shortly."
  }
}

type WizardValuesEs = z.infer<typeof content.es.wizardSchema>;
type WizardValuesEn = z.infer<typeof content.en.wizardSchema>;
type ContactValuesEs = z.infer<typeof content.es.contactSchema>;
type ContactValuesEn = z.infer<typeof content.en.contactSchema>;


export default function AiWizard() {
  const { language } = useLanguage();
  const c = content[language];
  const wizardSchema = c.wizardSchema;
  const contactSchema = c.contactSchema;

  const [step, setStep] = useState<"wizard" | "result" | "contact">("wizard");
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<ProductRecommendationOutput | null>(null);
  const { toast } = useToast();

  const [placeholder, setPlaceholder] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const placeholderIndex = useRef(0);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    resetField,
  } = useForm<WizardValuesEs | WizardValuesEn>({
    resolver: zodResolver(wizardSchema),
    defaultValues: { need: "" },
  });
  
  const userNeed = watch("need");

  useEffect(() => {
    const type = () => {
      const fullText = c.placeholderTexts[placeholderIndex.current];
      if (isTyping) {
        if (placeholder.length < fullText.length) {
          setPlaceholder(fullText.substring(0, placeholder.length + 1));
          typingTimeout.current = setTimeout(type, 100);
        } else {
          setIsTyping(false);
          typingTimeout.current = setTimeout(type, 2000); // Pause before deleting
        }
      } else {
        if (placeholder.length > 0) {
          setPlaceholder(placeholder.substring(0, placeholder.length - 1));
          typingTimeout.current = setTimeout(type, 50);
        } else {
          setIsTyping(true);
          placeholderIndex.current = (placeholderIndex.current + 1) % c.placeholderTexts.length;
        }
      }
    };

    if (!userNeed) {
      typingTimeout.current = setTimeout(type, 100);
    } else {
        if (typingTimeout.current) clearTimeout(typingTimeout.current);
    }

    return () => {
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }
    };
  }, [placeholder, isTyping, userNeed, c.placeholderTexts]);

  const handleFocus = () => {
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    setPlaceholder(c.staticPlaceholder);
  };

  const handleBlur = () => {
    if (!userNeed) {
        setPlaceholder("");
        setIsTyping(true);
        placeholderIndex.current = (placeholderIndex.current + 1) % c.placeholderTexts.length;
    }
  }

  const contactForm = useForm<ContactValuesEs | ContactValuesEn>({
    resolver: zodResolver(contactSchema),
  });

  const onWizardSubmit = async (data: WizardValuesEs | WizardValuesEn) => {
    setIsLoading(true);
    const result = await recommendProduct({ need: data.need });

    if (result.success && result.data) {
      setRecommendation(result.data);
      setStep("result");
    } else {
      toast({
        variant: "destructive",
        title: c.errorTitle,
        description: result.error || c.errorDescription,
      });
    }
    setIsLoading(false);
  };
  
  const onContactSubmit = (data: ContactValuesEs | ContactValuesEn) => {
    console.log("Lead captured:", data);
    toast({
      title: c.thankYou,
      description: c.messageSent,
    });
    contactForm.reset();
    setStep("wizard");
    setRecommendation(null);
  }

  return (
    <Card className="shadow-2xl w-full glassmorphism">
      {step === "wizard" && (
        <form onSubmit={handleSubmit(onWizardSubmit)}>
          <CardContent className="pt-6">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input 
                    {...register("need")} 
                    placeholder={placeholder}
                    className="pl-10 h-12 text-base"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    autoComplete="off"
                />
                 <Button type="submit" disabled={isLoading} className="absolute right-2 top-1/2 -translate-y-1/2 h-8">
                    {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                       <Send className="h-4 w-4" />
                    )}
                     <span className="sr-only">{c.getRecommendation}</span>
                </Button>
            </div>
             {errors.need && <p className="text-sm text-destructive mt-2 text-left">{errors.need.message}</p>}
             <p className="text-xs text-muted-foreground mt-3 text-left">
                <strong>{c.ideas}</strong> {c.ideasText}
            </p>
          </CardContent>
        </form>
      )}

      {step === "result" && recommendation && (
        <>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Lightbulb className="text-primary"/> {c.aiRecommendation}</CardTitle>
                <CardDescription>
                {c.basedOnNeeds}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="p-4 bg-primary/10 rounded-lg">
                    <h3 className="text-xl font-bold text-primary">{recommendation.recommendedProduct}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{recommendation.reason}</p>
                </div>
            </CardContent>
            <CardFooter className="flex-col sm:flex-row gap-2">
                 <Button onClick={() => setStep("contact")} className="w-full">{c.interested}</Button>
                <Button variant="outline" onClick={() => { setStep("wizard"); setRecommendation(null); resetField("need"); }} className="w-full">{c.startOver}</Button>
            </CardFooter>
        </>
      )}

      {step === "contact" && (
         <form onSubmit={contactForm.handleSubmit(onContactSubmit)}>
            <CardHeader>
                <CardTitle>{c.contactUs}</CardTitle>
                <CardDescription>
                {c.contactAbout} <strong>{recommendation?.recommendedProduct}</strong> {c.contactHelp}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input {...contactForm.register("name")} placeholder={c.yourName} className="pl-8"/>
                    {contactForm.formState.errors.name && <p className="text-sm text-destructive mt-1">{contactForm.formState.errors.name.message}</p>}
                </div>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input {...contactForm.register("email")} placeholder={c.yourEmail} className="pl-8"/>
                    {contactForm.formState.errors.email && <p className="text-sm text-destructive mt-1">{contactForm.formState.errors.email.message}</p>}
                </div>
                 <div className="relative">
                    <MessageSquare className="absolute left-3 top-4 text-muted-foreground h-4 w-4" />
                    <Textarea {...contactForm.register("message")} placeholder={c.optionalMessage} className="pl-8"/>
                </div>
            </CardContent>
            <CardFooter className="flex-col sm:flex-row gap-2">
                <Button type="submit" disabled={contactForm.formState.isSubmitting} className="w-full"><Send className="mr-2 h-4 w-4"/>{c.sendMessage}</Button>
                <Button variant="ghost" onClick={() => setStep("result")} className="w-full">{c.back}</Button>
            </CardFooter>
        </form>
      )}
    </Card>
  );
}
