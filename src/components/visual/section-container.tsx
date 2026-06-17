import { type HTMLAttributes } from "react";

import { Container, type ContainerProps } from "@/components/ui/container";
import { Section, type SectionProps } from "@/components/ui/section";
import { cn } from "@/lib/utils";

export interface SectionContainerProps extends HTMLAttributes<HTMLElement> {
  sectionProps?: SectionProps;
  containerProps?: ContainerProps;
}

export function SectionContainer({
  className,
  children,
  sectionProps,
  containerProps,
  ...props
}: SectionContainerProps) {
  return (
    <Section {...sectionProps}>
      <Container className={cn(className)} {...containerProps} {...props}>
        {children}
      </Container>
    </Section>
  );
}
