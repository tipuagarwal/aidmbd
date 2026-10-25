import { Quote } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonialsSection } from "@/content/home";
import { testimonials } from "@/content/testimonials";

/** Renders nothing until approved testimonials exist. */
export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <Section aria-labelledby="testimonials-title">
      <SectionHeading
        id="testimonials-title"
        eyebrow={testimonialsSection.eyebrow}
        title={testimonialsSection.title}
      />
      <Stagger className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <StaggerItem key={testimonial.id} className="h-full">
            <Card className="flex h-full flex-col">
              <Quote aria-hidden className="size-7 text-copper-500" />
              <blockquote className="mt-5 flex-1 leading-relaxed text-titanium-300">
                {testimonial.quote}
              </blockquote>
              <div className="mt-6 flex items-end justify-between gap-4 border-t border-line pt-5">
                <p className="text-sm">
                  <span className="block font-semibold">{testimonial.name}</span>
                  <span className="text-titanium-500">{testimonial.role}</span>
                </p>
                <Badge tone="copper" className="capitalize">
                  {testimonial.kind}
                </Badge>
              </div>
            </Card>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
