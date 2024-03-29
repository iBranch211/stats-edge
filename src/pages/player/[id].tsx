import {
  Image,
  Box,
  Card,
  Center,
  Container,
  Flex,
  Grid,
  Space,
  Stack,
  Text,
  Title,
  Slider,
} from "@mantine/core";
import { FadeUpAni } from "~/components/animation/fade-up";
import { LayoutComp } from "~/components/layout";
import { SportSelector } from "~/components/player-page/sports";
import { PathDisplay } from "~/components/pathdisplay";
import { SportInfo } from "~/lib/functions";
import { BREAKPOINTS } from "~/styles/globals";
import { useMediaQuery } from "@mantine/hooks";
import { AdBanner } from "~/components/player-page/ad-banner";
import { PlayerImg } from "~/components/player-page/player-pic";
import { PlayerDetails } from "~/components/player-page/player-details";
import { Achievements } from "~/components/player-page/achievements";
import { RoleRow } from "~/components/player-page/role-row";
import MainFilters from "~/components/player-page/main-filter";
import { LineChart } from "@mantine/charts";
import { performance } from "../api/charts/perform-chart";
import OverallStats from "~/components/player-page/overall-stats";
import MatchStats from "~/components/player-page/match-stats";
import HitRate from "~/components/player-page/hit-rate";
import { useState } from "react";
import {
  type InferGetServerSidePropsType,
  type GetServerSidePropsContext,
} from "next";
import { z } from "zod";
import { PlayerMatchHistory } from "~/components/player-page/player-match-history";
import { PlayerInfoTest } from "~/lib/sport-api/player/combine-test";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;

  const parsedId = z
    .string()
    .regex(/^[0-9]+$/)
    .transform((val) => parseInt(val))
    .safeParse(id);

  if (!parsedId.success) {
    return { notFound: true };
  }

  const PlayerInfo = await PlayerInfoTest({ id: parsedId.data });

  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=30, stale-while-revalidate=30"
  );

  return {
    props: {
      ...PlayerInfo,
      sport: "lol",
    },
  };
}

export default function Player(
  player: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const [value, setValue] = useState(50);

  const BigThenMd = useMediaQuery(`(min-width: ${BREAKPOINTS.MD})`);
  const BigThenXs = useMediaQuery(`(min-width: ${BREAKPOINTS.XS})`);

  const sport = SportInfo(player.sport);

  if (!sport) {
    return (
      <>
        <Center>
          <Text>Unknown sport</Text>
        </Center>
      </>
    );
  }

  return (
    <>
      <LayoutComp>
        <Container size="xl" mt="xl">
          <Stack gap="sm">
            <FadeUpAni>
              <SportSelector
                sport={sport}
                disabled
                setSport={(sport) => {
                  console.log(sport);
                }}
              />
            </FadeUpAni>

            <FadeUpAni>
              <AdBanner />
            </FadeUpAni>

            <FadeUpAni>
              <PathDisplay
                path={[
                  {
                    text: `Player Profile`,
                    link: `/`,
                  },
                ]}
              />
            </FadeUpAni>

            <FadeUpAni>
              <Grid columns={10}>
                <Grid.Col span={{ base: 10, md: 4 }}>
                  <PlayerImg src={player.image_url ?? ""} />
                </Grid.Col>
                <Grid.Col span={{ base: 10, md: 6 }}>
                  <Box
                    display={"flex"}
                    style={{
                      justifyContent: "space-between",
                      flexDirection: BigThenMd ? "row" : "column",
                    }}
                  >
                    <PlayerDetails
                      name={`${player.first_name} ${player.last_name}`}
                      nickname={player.slug ?? "No nickname"}
                      logo={sport.logo}
                      sport={sport.alias}
                      country={player.nationality?.toLowerCase() ?? "unknown"}
                      team_name={player.current_team?.name ?? "No team"}
                    />

                    <Achievements />
                  </Box>

                  <RoleRow player={player} />

                  {sport.alias != "rl" && sport.alias != "dota2" && (
                    <></>
                    // <BarChart
                    //   display={BigThenMd ? "block" : "none"}
                    //   h={300}
                    //   maw={500}
                    //   // data={[
                    //   //   {
                    //   //     key: "Rating 2.0",
                    //   //     Points: stats?.meta.gsk_rating ?? 0,
                    //   //   },
                    //   //   {
                    //   //     key: "DPR",
                    //   //     Points: stats?.averagePerRound.deaths ?? 0,
                    //   //   },
                    //   //   {
                    //   //     key: "KAST",
                    //   //     Points: stats?.averagePerRound.kast ?? 0,
                    //   //   },
                    //   //   {
                    //   //     key: "Impact",
                    //   //     Points: 0,
                    //   //   },
                    //   //   {
                    //   //     key: "ADR",
                    //   //     Points: stats?.averagePerRound.adr ?? 0,
                    //   //   },
                    //   //   {
                    //   //     key: "KPR",
                    //   //     Points: stats?.averagePerRound.kills ?? 0,
                    //   //   },
                    //   // ]}
                    //   dataKey="key"
                    //   type="stacked"
                    //   orientation="vertical"
                    //   yAxisProps={{ width: 80 }}
                    //   mt={"lg"}
                    //   gridAxis="none"
                    //   withTooltip={false}
                    //   referenceLines={[
                    //     {
                    //       x: 100,
                    //       color: "white",
                    //     },
                    //   ]}
                    //   series={[{ name: "Points", color: "blue.6" }]}
                    // />
                  )}
                </Grid.Col>
              </Grid>
            </FadeUpAni>

            <Space />

            <MainFilters />

            <Space />

            <Grid columns={10}>
              <Grid.Col span={{ base: 10, md: 7 }}>
                <FadeUpAni>
                  <HitRate sport={sport.alias} />
                </FadeUpAni>
              </Grid.Col>
              <Grid.Col span={{ base: 10, md: 3 }}>
                <FadeUpAni>
                  <Flex gap={"15px"} justify={"space-between"}>
                    <Flex
                      gap={"10px"}
                      direction={"column"}
                      align={"center"}
                      w={"100%"}
                    >
                      <Text fz={"md"} fw={"bold"} c={"blue"}>
                        VS
                      </Text>
                      <Text fz={"xs"}>18.5</Text>
                      <Box
                        bg={"green"}
                        style={{
                          padding: "10px 25px",
                          borderRadius: "10px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                        w={"90%"}
                      >
                        <Text fz={"xs"}>18.5</Text>
                        <Text fz={"xs"}>18.5</Text>
                      </Box>
                    </Flex>
                    <Flex
                      gap={"10px"}
                      direction={"column"}
                      align={"center"}
                      w={"100%"}
                    >
                      <Text fz={"md"} fw={"bold"} c={"blue"}>
                        L10
                      </Text>
                      <Text fz={"xs"}>18.5</Text>
                      <Box
                        bg={"red"}
                        style={{
                          padding: "10px 25px",
                          borderRadius: "10px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                        w={"90%"}
                      >
                        <Text fz={"xs"}>18.5</Text>
                        <Text fz={"xs"}>18.5</Text>
                      </Box>
                    </Flex>
                    <Flex
                      gap={"10px"}
                      direction={"column"}
                      align={"center"}
                      w={"100%"}
                    >
                      <Text fz={"md"} fw={"bold"} c={"blue"}>
                        L5
                      </Text>
                      <Text fz={"xs"}>18.5</Text>
                      <Box
                        bg={"green"}
                        style={{
                          padding: "10px 25px",
                          borderRadius: "10px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                        w={"90%"}
                      >
                        <Text fz={"xs"}>18.5</Text>
                        <Text fz={"xs"}>18.5</Text>
                      </Box>
                    </Flex>
                  </Flex>
                </FadeUpAni>

                <FadeUpAni>
                  <Flex
                    w={"100%"}
                    gap={"md"}
                    mt={"lg"}
                    justify={"center"}
                    align={"center"}
                    direction={"column"}
                  >
                    <Text w={"100%"} fz={"md"} ta={"center"}>
                      Line
                    </Text>
                    <Box
                      w={"100%"}
                      bg={"blue"}
                      style={{ borderRadius: "15px" }}
                    >
                      <Card
                        w={"100%"}
                        display={"flex"}
                        style={{
                          gap: "10px",
                          justifyContent: "center",
                          flexDirection: "row",
                          padding: "20px 10px",
                        }}
                      >
                        <Text size="sm" w={"15%"} ta={"center"}>
                          <b>{value}</b>
                        </Text>
                        <Slider
                          label={null}
                          size={"sm"}
                          thumbSize={"15px"}
                          w={"85%"}
                          value={value}
                          onChange={setValue}
                        />
                      </Card>
                      <Text w={"100%"} p={"sm"} ta={"center"}>
                        Line: 18.5 - 8/10 (80%)
                      </Text>
                    </Box>
                  </Flex>
                </FadeUpAni>

                <FadeUpAni>
                  <Box
                    bg={"#161515"}
                    mt={"lg"}
                    style={{ borderRadius: "20px" }}
                  >
                    <Flex
                      justify={"space-between"}
                      bg={"#101010"}
                      style={{
                        borderBottom: "1px solid #1d1d1d",
                        borderTopLeftRadius: "20px",
                        borderTopRighttRadius: "20px",
                      }}
                      p={"md"}
                    >
                      <Text fz={"sm"}>
                        <b>Next Match:</b>
                      </Text>
                      <Text fz={"xs"}>6:00pm 15th January, 2024</Text>
                    </Flex>
                    <Flex direction={"column"} p={"sm"} gap={"sm"}>
                      <Flex justify={"space-between"} align={"center"}>
                        <Box display={"flex"} style={{ gap: "15px" }}>
                          <Image
                            src={"/place.svg"}
                            alt="league logo"
                            fit="contain"
                            h={BigThenXs ? 20 : 15}
                          />
                          <Text fz={"sm"}>Team Name</Text>
                        </Box>
                        <Box
                          display={"flex"}
                          style={{
                            gap: "10px",
                            border: "1px solid #1d1d1d",
                            padding: "5px",
                            borderRadius: "5px",
                          }}
                          bg={"#071225"}
                        >
                          <Image
                            src={"/icon-2.png"}
                            alt="league logo"
                            fit="contain"
                            h={BigThenXs ? 20 : 15}
                          />
                          <Text fz={"sm"}>+250</Text>
                        </Box>
                      </Flex>
                      <Flex justify={"space-between"} align={"center"}>
                        <Box display={"flex"} style={{ gap: "15px" }}>
                          <Image
                            src={"/place.svg"}
                            alt="league logo"
                            fit="contain"
                            h={BigThenXs ? 20 : 15}
                          />
                          <Text fz={"sm"}>Team Name</Text>
                        </Box>
                        <Box
                          display={"flex"}
                          style={{
                            gap: "10px",
                            border: "1px solid #1d1d1d",
                            padding: "5px",
                            borderRadius: "5px",
                          }}
                          bg={"#071225"}
                        >
                          <Image
                            src={"/icon-2.png"}
                            alt="league logo"
                            fit="contain"
                            h={BigThenXs ? 20 : 15}
                          />
                          <Text fz={"sm"}>+250</Text>
                        </Box>
                      </Flex>
                    </Flex>
                  </Box>
                </FadeUpAni>
              </Grid.Col>
            </Grid>

            <Space />

            <Grid columns={10} mt={"md"}>
              <Grid.Col span={{ base: 10, md: 5 }}>
                {sport.alias != "rl" && sport.alias != "codmwiii" && (
                  <FadeUpAni>
                    <OverallStats player={player} />
                  </FadeUpAni>
                )}
                {sport.alias != "lol" &&
                  sport.alias != "cs2" &&
                  sport.alias != "valorant" &&
                  sport.alias != "dota2" && (
                    <FadeUpAni>
                      <Card p={"20px"}>
                        <Title order={4} tt={"uppercase"} pb={"md"}>
                          Performance Chart
                        </Title>
                        <LineChart
                          h={300}
                          data={performance}
                          dataKey="key"
                          series={[{ name: "Apples", color: "blue.6" }]}
                          curveType="natural"
                          gridAxis="xy"
                        />
                      </Card>
                    </FadeUpAni>
                  )}
              </Grid.Col>
              <Grid.Col span={{ base: 10, md: 5 }}>
                <FadeUpAni>
                  <MatchStats sport={sport.alias} matches={player} />
                </FadeUpAni>

                {sport.alias != "lol" &&
                  sport.alias != "dota2" &&
                  sport.alias != "rl" &&
                  sport.alias != "codmwiii" && (
                    <FadeUpAni>
                      <Card p={"20px"} mt={"md"}>
                        <Title order={4} tt={"uppercase"} pb={"md"}>
                          Performance Chart
                        </Title>
                        <LineChart
                          h={300}
                          data={performance}
                          dataKey="key"
                          series={[{ name: "Apples", color: "blue.6" }]}
                          curveType="natural"
                          gridAxis="xy"
                        />
                      </Card>
                    </FadeUpAni>
                  )}
              </Grid.Col>
            </Grid>

            <FadeUpAni>
              <PlayerMatchHistory player={player} />
            </FadeUpAni>
          </Stack>
        </Container>
      </LayoutComp>
    </>
  );
}
