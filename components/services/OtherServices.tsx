import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { IconCircleArrow } from "@/components/ui/IconCircleArrow";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { serviceDetail, services } from "@/content/services";
import type { Service } from "@/lib/types";

export function OtherServices({ current }: { current: Service }) {
  const others = services.filter((service) => service.slug !== current.slug);

  return (
    <Section aria-labelledby="other-services-title" className="pb-0 md:pb-0">
      <SectionHeading
        id="other-services-title"
        eyebrow={serviceDetail.others.eyebrow}
        title={serviceDetail.others.title}
      />
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {others.map((service) => (
          <li key={service.slug}>
            <Link
              href={`/services/${service.slug}`}
              className="group flex h-full items-center gap-4 rounded-xl border border-copper-500/25 bg-ink-800/40 p-4 transition-[border-color,box-shadow] duration-300 ease-brand hover:border-copper-500/60 hover:shadow-glow lg:flex-col lg:items-start lg:p-5"
            >
              <Icon name={service.icon} className="size-6 shrink-0 text-copper-400" />
              <span className="flex-1 font-semibold leading-snug transition-colors group-hover:text-copper-300">
                {service.title}
              </span>
              <IconCircleArrow className="lg:self-end" />
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
