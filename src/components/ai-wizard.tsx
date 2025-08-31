"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Lightbulb, Send, User, Mail, MessageSquare } from "lucide-react";

const wizardSchema = z.object({
  goal: z.string().min(1, "Please select a goal."),
  challenge: z.string().min(10, "Please describe your challenge briefly."),
});

type WizardValues = z.infer<typeof wizardSchema>;

const contactSchema = z.object({
  name: z.string().min(2, "Name is required."),
  email: z.string().email("Invalid email address."),
  message: z.string().optional(),
});

type ContactValues = z.infer<typeof contactSchema>;

export default function AiWizard() {
  const [step, setStep] = useState<"wizard" | "result" | "contact">("wizard");
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<ProductRecommendationOutput | null>(null);
  const { toast } = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<WizardValues>({
    resolver: zodResolver(wizardSchema),
  });

  const contactForm = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
  });

  const onWizardSubmit = async (data: WizardValues) => {
    setIsLoading(true);
    const need = `Goal: ${data.goal}. Challenge: ${data.challenge}`;
    const result = await recommendProduct({ need });

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
    <Card className="shadow-2xl w-full">
      {step === "wizard" && (
        <form onSubmit={handleSubmit(onWizardSubmit)}>
          <CardHeader>
            <CardTitle>AI Recommendation Wizard</CardTitle>
            <CardDescription>
              Answer 2 questions to get a personalized product recommendation.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label>1. What is your main goal?</Label>
              <Controller
                name="goal"
                control={control}
                render={({ field }) => (
                  <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      "Predict trends with Big Data",
                      "Automate and validate legal documents",
                      "Streamline administrative processes",
                      "Digitize paper-based workflows",
                    ].map((goal) => (
                      <div key={goal}>
                        <RadioGroupItem value={goal} id={goal} className="peer sr-only" />
                        <Label htmlFor={goal} className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                          {goal}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              />
              {errors.goal && <p className="text-sm text-destructive">{errors.goal.message}</p>}
            </div>
            <div className="space-y-3">
              <Label htmlFor="challenge">2. Briefly describe your current challenge.</Label>
              <Controller
                name="challenge"
                control={control}
                render={({ field }) => (
                  <Textarea
                    id="challenge"
                    placeholder="e.g., 'Our current process for reviewing decrees is slow and prone to human error.'"
                    {...field}
                  />
                )}
              />
              {errors.challenge && <p className="text-sm text-destructive">{errors.challenge.message}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Getting Recommendation...
                </>
              ) : (
                "Get AI Recommendation"
              )}
            </Button>
          </CardFooter>
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
                <Button variant="outline" onClick={() => { setStep("wizard"); setRecommendation(null); }} className="w-full">Start Over</Button>
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
