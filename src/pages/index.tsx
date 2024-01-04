import { Divider, Space, Stack, rem } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { LandingCOACard } from "~/components/landing/call-of-action-card";
import { LandingFAQComp } from "~/components/landing/faq";
import { LandingFeaturesComp } from "~/components/landing/features";
import { GameListComp } from "~/components/landing/games-list";
import { LandingHeroComp } from "~/components/landing/hero";
import { LayoutComp } from "~/components/layout";

export default function Home() {
  const BiggerThan431 = useMediaQuery("(min-width: 431px)");

  return (
    <>
      <LayoutComp>
        <Stack gap={0}>
          <LandingHeroComp />

          <Space h="xl" />

          <GameListComp />

          <Space h="xl" />

          <Divider size="sm" mx={BiggerThan431 ? "xl" : 0} />

          <Space h={rem(90)} />

          <LandingFeaturesComp />

          <Space h={rem(90)} />

          <LandingCOACard />

          <Space h={rem(90)} />

          <LandingFAQComp />
        </Stack>
      </LayoutComp>
    </>
  );
}
