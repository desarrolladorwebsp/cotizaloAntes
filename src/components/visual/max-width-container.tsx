import { Container, type ContainerProps } from "@/components/ui/container";

export type MaxWidthContainerProps = ContainerProps;

export function MaxWidthContainer(props: MaxWidthContainerProps) {
  return <Container size="2xl" padding="default" {...props} />;
}
