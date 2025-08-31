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

const wizardSchema = z.object({
  need: z.string().min(10, "Please describe your needs in a few words."),
});

type WizardValues = z.infer<typeof wizardSchema>;

const contactSchema = z.object({
  name: z.string().min(2, "Name is required."),
  email: z.string().email("Invalid email address."),
  message: z.string().optional(),
});

type ContactValues = z.infer<typeof contactSchema>;

const placeholderTexts = [
    "I need to automate legal document validation",
    "How can I analyze large volumes of data?",
    "I want to digitize my paper-based processes",
    "We need to improve our internal control systems",
];

export default function AiWizard() {
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
  } = useForm<WizardValues>({
    resolver: zodResolver(wizardSchema),
    defaultValues: { need: "" },
  });
  
  const userNeed = watch("need");

  useEffect(() => {
    const type = () => {
      const fullText = placeholderTexts[placeholderIndex.current];
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
          placeholderIndex.current = (placeholderIndex.current + 1) % placeholderTexts.length;
        }
      }
    };

    if (!userNeed) {
      typingTimeout.current = setTimeout(type, 100);
    }

    return () => {
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }
    };
  }, [placeholder, isTyping, userNeed]);

  const handleFocus = () => {
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    setPlaceholder("Tell us what you need..."); // Static placeholder on focus
  };

  const handleBlur = () => {
    if (!userNeed) {
        setPlaceholder(""); // Restart animation
        setIsTyping(true);
        placeholderIndex.current = (placeholderIndex.current + 1) % placeholderTexts.length;
    }
  }

  const contactForm = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
  });

  const onWizardSubmit = async (data: WizardValues) => {
    setIsLoading(true);
    const result = await recommendProduct({ need: data.need });

    if (result.success && result.data) {
      setRecommendation(result.data);
      setStep("result");
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error || "Could not get a recommendation. Please try again.",
      });
    }
    setIsLoading(false);
  };
  
  const onContactSubmit = (data: ContactValues) => {
    console.log("Lead captured:", data);
    toast({
      title: "Thank you!",
      description: "Your message has been sent. We will contact you shortly.",
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
                     <span className="sr-only">Get Recommendation</span>
                </Button>
            </div>
             {errors.need && <p className="text-sm text-destructive mt-2 text-left">{errors.need.message}</p>}
             <p className="text-xs text-muted-foreground mt-3 text-left">
                <strong>Some ideas:</strong> What is your main goal? What is your current challenge?
            </p>
          </CardContent>
        </form>
      )}

      {step === "result" && recommendation && (
        <>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Lightbulb className="text-primary"/> AI Recommendation</CardTitle>
                <CardDescription>
                Based on your needs, here is our suggestion.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="p-4 bg-primary/10 rounded-lg">
                    <h3 className="text-xl font-bold text-primary">{recommendation.recommendedProduct}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{recommendation.reason}</p>
                </div>
            </CardContent>
            <CardFooter className="flex-col sm:flex-row gap-2">
                 <Button onClick={() => setStep("contact")} className="w-full">Interested? Contact Us</Button>
                <Button variant="outline" onClick={() => { setStep("wizard"); setRecommendation(null); resetField("need"); }} className="w-full">Start Over</Button>
            </CardFooter>
        </>
      )}

      {step === "contact" && (
         <form onSubmit={contactForm.handleSubmit(onContactSubmit)}>
            <CardHeader>
                <CardTitle>Contact Us</CardTitle>
                <CardDescription>
                Let's talk about how <strong>{recommendation?.recommendedProduct}</strong> can help you. Please provide your contact details.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input {...contactForm.register("name")} placeholder="Your Name" className="pl-8"/>
                    {contactForm.formState.errors.name && <p className="text-sm text-destructive mt-1">{contactForm.formState.errors.name.message}</p>}
                </div>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input {...contactForm.register("email")} placeholder="Your Email" className="pl-8"/>
                    {contactForm.formState.errors.email && <p className="text-sm text-destructive mt-1">{contactForm.formState.errors.email.message}</p>}
                </div>
                 <div className="relative">
                    <MessageSquare className="absolute left-3 top-4 text-muted-foreground h-4 w-4" />
                    <Textarea {...contactForm.register("message")} placeholder="Optional message..." className="pl-8"/>
                </div>
            </CardContent>
            <CardFooter className="flex-col sm:flex-row gap-2">
                <Button type="submit" disabled={contactForm.formState.isSubmitting} className="w-full"><Send className="mr-2 h-4 w-4"/> Send Message</Button>
                <Button variant="ghost" onClick={() => setStep("result")} className="w-full">Back</Button>
            </CardFooter>
        </form>
      )}
    </Card>
  );
}
