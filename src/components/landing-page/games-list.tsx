import { Center, Image, SimpleGrid, rem } from "@mantine/core";
import { useHover, useMediaQuery } from "@mantine/hooks";
import { Children } from "react";
import { GAME_LIST } from "~/lib/data";
import { BREAKPOINTS } from "~/styles/globals";

function GameComp({ src }: { src: string }) {
  const { hovered, ref } = useHover<HTMLImageElement>();

  const BigThenMd = useMediaQuery(`(min-width: ${BREAKPOINTS.MD})`);

  return (
    <Image
      ref={ref}
      src={src}
      mah={BigThenMd ? 50 : 30}
      alt="game"
      fit="contain"
      style={{
        cursor: "pointer",
        filter: hovered ? "grayscale(0)" : "grayscale(1)",
      }}
    />
  );
}

export function GameListComp() {
  return (
    <>
      <Center>
        <SimpleGrid spacing={{ base: rem(20), md: rem(100) }} cols={6}>
          {Children.toArray(
            GAME_LIST.map((game) => <GameComp src={game.icon} />)
          )}
        </SimpleGrid>
      </Center>
    </>
  );
}
