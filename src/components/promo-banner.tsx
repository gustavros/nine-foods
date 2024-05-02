import Image, { ImageProps } from "next/image";

export default function PromoBanner(props: ImageProps) {
  const defaultAlt = "Next.js Logo";

  return (
    <Image
      {...props}
      alt={props.alt || defaultAlt}
      width={0}
      height={0}
      quality={100}
      sizes="100vw"
      className="h-auto w-full object-contain"
    />
  );
}
