import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Award, ClipboardCheck, FolderCode, LifeBuoy, ReceiptText, UserRound, type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Overline } from "@/components/ui/Overline";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { coursePage } from "@/content/academy";
import type { Course } from "@/lib/types";

function DetailCard({ icon: CardIcon, title, children }: { icon: LucideIcon; title: string; children: ReactNode }) {
  return (
    <Card className="flex h-full flex-col p-7">
      <CardIcon aria-hidden strokeWidth={1.5} className="size-7 text-copper-400" />
      <h3 className="mt-5 text-lg font-semibold">{title}</h3>
      <div className="mt-4 flex-1 text-sm leading-relaxed text-titanium-300">{children}</div>
    </Card>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-copper-500" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function Pending({ children }: { children: ReactNode }) {
  return <span className="text-titanium-500">{children}</span>;
}

/**
 * Instructor, resources, support, assessment, certificate, fees and terms
 * (requirements §8.3, fields 4 and 7–12).
 */
export function CourseDetails({ course }: { course: Course }) {
  const { learning, instructor, terms } = coursePage;

  return (
    <Section aria-labelledby="details-title">
      <SectionHeading id="details-title" eyebrow={learning.eyebrow} title={learning.title} />
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DetailCard icon={UserRound} title={instructor.title}>
          {course.instructor ? (
            <div className="flex gap-4">
              <Image
                src={course.instructor.photo}
                alt={course.instructor.name}
                width={64}
                height={64}
                className="size-16 shrink-0 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-titanium-50">{course.instructor.name}</p>
                <p className="text-titanium-500">{course.instructor.role}</p>
                <p className="mt-3">{course.instructor.bio}</p>
              </div>
            </div>
          ) : (
            <Pending>{instructor.pending}</Pending>
          )}
        </DetailCard>

        <DetailCard icon={FolderCode} title={learning.resources}>
          <List items={course.resources} />
        </DetailCard>

        <DetailCard icon={ClipboardCheck} title={learning.assessment}>
          <List items={course.assessment} />
        </DetailCard>

        <DetailCard icon={LifeBuoy} title={learning.support}>
          {course.support ?? <Pending>{coursePage.pending}</Pending>}
        </DetailCard>

        <DetailCard icon={Award} title={learning.certificate}>
          {course.certificate}
        </DetailCard>

        <DetailCard icon={ReceiptText} title={terms.title}>
          <dl className="space-y-4">
            <div>
              <dt>
                <Overline>{terms.fee}</Overline>
              </dt>
              <dd className="mt-1">{course.fee ?? <Pending>{coursePage.pending}</Pending>}</dd>
            </div>
            <div>
              <dt>
                <Overline>{terms.toolCosts}</Overline>
              </dt>
              <dd className="mt-1">{course.toolCosts}</dd>
            </div>
            <div>
              <dt>
                <Overline>{terms.access}</Overline>
              </dt>
              <dd className="mt-1">{course.access ?? <Pending>{coursePage.pending}</Pending>}</dd>
            </div>
          </dl>
          <p className="mt-5 text-titanium-500">
            {terms.policies}{" "}
            {terms.links.map((link, index) => (
              <span key={link.href}>
                {index > 0 && " · "}
                <Link href={link.href} className="text-copper-400 underline decoration-copper-400/40 underline-offset-4 transition-colors hover:text-copper-300 hover:decoration-copper-300">
                  {link.label}
                </Link>
              </span>
            ))}
          </p>
        </DetailCard>
      </div>
    </Section>
  );
}
