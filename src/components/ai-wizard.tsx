
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
import { Loader2, Lightbulb, Send, User, Mail, MessageSquare, Search, ArrowRight } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { useLanguage } from "@/contexts/language-context";
import Link from "next/link";

const content = {
  es: {
    wizardSchema: z.object({
      need: z.string().min(10, "Por favor, describe tus necesidades en pocas palabras."),
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
    learnMore: "Ver más",
    contact: "Contactar",
    startOver: "Empezar de Nuevo",
  },
  en: {
    wizardSchema: z.object({
      need: z.string().min(10, "Please describe your needs in a few words."),
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
    learnMore: "Learn More",
    contact: "Contact",
    startOver: "Start Over",
  }
}

const productLinks: Record<string, string> = {
    'Quest': '/products/quest',
    'Mila': '/products/mila',
    'Vuro': '/products/vuro',
    'Sistema de Expediente Electronico': '/products/see',
}

type WizardValuesEs = z.infer<typeof content.es.wizardSchema>;
type WizardValuesEn = z.infer<typeof content.en.wizardSchema>;


export default function AiWizard() {
  const { language } = useLanguage();
  const c = content[language];
  const wizardSchema = c.wizardSchema;

  const [step, setStep] = useState<"wizard" | "result">("wizard");
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
    reset,
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

  const handleStartOver = () => {
    setStep("wizard");
    setRecommendation(null);
    reset();
  }

  const generateMailto = (productName: string) => {
    const subject = `Solicitud de demo de ${productName}`;
    const body = `Estimados,\n\nMe gustaría coordinar una reunión para un demo de ${productName}.\n\nMe interesa porque...\n\nSaludos.`;
    return `mailto:contacto@plusbi.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  
  const recommendedProductLink = recommendation ? productLinks[recommendation.recommendedProduct] : '#';

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
            <CardFooter className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <Button asChild variant="outline" className="w-full">
                    <Link href={recommendedProductLink}>{c.learnMore} <ArrowRight /></Link>
                </Button>
                <Button asChild className="w-full">
                    <a href={generateMailto(recommendation.recommendedProduct)}>{c.contact} <Mail /></a>
                </Button>
                <Button variant="ghost" onClick={handleStartOver} className="w-full sm:col-span-3">{c.startOver}</Button>
            </CardFooter>
        </>
      )}

    </Card>
  );
}
