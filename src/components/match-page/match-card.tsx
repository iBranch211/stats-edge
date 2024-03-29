import { Box, Card, Flex, Group, Image, Stack, Text, rem } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import { SportInfo, NumTimeFormat } from "~/lib/functions";
import { BREAKPOINTS } from "~/styles/globals";
import { type RouterOutputs } from "~/utils/api";

interface MatchCardProps {
  match: Exclude<
    RouterOutputs["fixture"]["list"]["data"],
    undefined
  >["fixtures"][0]["fixtures"][0];
}

export function MatchCard(props: MatchCardProps) {
  const BigThenMd = useMediaQuery(`(min-width: ${BREAKPOINTS.MD})`);

  const sportinfo = SportInfo(props.match.sport.alias);

  if (!BigThenMd) {
    return (
      <>
        <Card
          withBorder
          style={{ borderColor: '#0b0b0b' }}
          radius={'1'}
          bg=""
          px={5}
          py="xs"
          component={Link}
          href={`/matches/${props.match.id}`}
        >
          <Flex gap={5} justify="space-between" w="100%">
            <Image
              src={sportinfo?.logo}
              mah={rem(20)}
              alt="game icon"
              fit="contain"
              style={{
                filter: "grayscale(1)",
                flexGrow: 0,
              }}
              my="auto"
              display={BigThenMd ? '' : 'none'}
            />

            <Box
              p={5}
              bg="dark.7"
              h="fit-content"
              style={{
                border: "2px solid #333",
                flexGrow: 0,
              }}
              my="auto"
            >
              <Text size={rem(10)}>BO3</Text>
            </Box>

            <Stack
              gap={3}
              style={{
                flexGrow: 0,
              }}
              my="auto"
            >
              <Group gap={3}>
                <Image
                  src={`/api/team/logo?id=${props.match.participants[0]!.id}`}
                  alt="league logo"
                  fit="contain"
                  mah={rem(15)}
                  fallbackSrc="/place.svg"
                />
                <Text size={rem(10)} maw={100} truncate="end" tt="capitalize">
                  {props.match.participants[0]!.name ?? "Unknown"}
                </Text>
              </Group>

              <Group gap={3}>
                <Image
                  src={`/api/team/logo?id=${props.match.participants[1]!.id}`}
                  alt="league logo"
                  fit="contain"
                  mah={rem(15)}
                  fallbackSrc="/place.svg"
                />
                <Text size={rem(10)} maw={100} truncate="end" tt="capitalize">
                  {props.match.participants[1]!.name ?? "Unknown"}
                </Text>
              </Group>
            </Stack>

            <Stack gap="xs" my="auto">
              <Text size={rem(10)}>{props.match.participants[1]!.score}</Text>

              <Text size={rem(10)}>{props.match.participants[1]!.score}</Text>
            </Stack>

            <Stack gap="xs" my="auto">
              <Group gap={3}>
                <Image
                  // TODO: use league logo
                  src="https://cdn.discordapp.com/attachments/1192566850110898177/1192925149452836894/nYADQoBBHeOXRjBW1kFOra.png.png?ex=65aad91f&is=6598641f&hm=fb33c4462de67e31cff4ba38597fc84eb8af58417d1fb4c903ecaf0aeed7f01b&"
                  alt="league logo"
                  fit="contain"
                  mah={rem(20)}
                />
                <Text size={rem(10)} maw={150} lh={rem(14)}>
                  {props.match.competition.name}
                </Text>
              </Group>

              <Group gap={3}>
                {(() => {
                  if (props.match.status === "Started") {
                    return (
                      <>
                        <Group gap={3}>
                          <Box
                            style={{
                              backgroundColor: "var(--mantine-color-red-6)",
                              borderRadius: "50%",
                              width: "7px",
                              height: "7px",
                            }}
                          />

                          <Text size={rem(10)}>LIVE</Text>
                        </Group>
                      </>
                    );
                  }

                  if (props.match.status === "Scheduled") {
                    return (
                      <>
                        <Group gap={3}>
                          <Box
                            style={{
                              backgroundColor: "var(--mantine-color-yellow-6)",
                              borderRadius: "50%",
                              width: "7px",
                              height: "7px",
                            }}
                          />

                          <Text size={rem(10)}>UPCOMING</Text>
                        </Group>
                      </>
                    );
                  }

                  return <></>;
                })()}

                <Text size={rem(10)} c="blue">
                  {NumTimeFormat(props.match.scheduledStartTime, "Mon, 14:00")}
                </Text>
              </Group>
            </Stack>
          </Flex>
        </Card>
      </>
    );
  }

  return (
    <>
      <Card
        withBorder
        bg="transparent"
        component={Link}
        href={`/matches/${props.match.id}`}
      >
        <Group justify="space-around">
          <Image
            src={sportinfo?.logo}
            mah={30}
            alt="game icon"
            fit="contain"
            style={{
              filter: "grayscale(1)",
            }}
          />

          <Box
            p="xs"
            bg="dark.7"
            style={{
              border: "2px solid #333",
            }}
          >
            <Text size="xs">BO{props.match.format.value}</Text>
          </Box>

          <Stack gap={5}>
            <Group>
              <Image
                src={`/api/team/logo?id=${props.match.participants[0]!.id}`}
                alt="league logo"
                fit="contain"
                mah={20}
                fallbackSrc="/place.svg"
              />
              <Text size="xs" w={120} tt="capitalize">
                {props.match.participants[0]!.name ?? "Unknown"}
              </Text>
            </Group>

            <Group>
              <Image
                src={`/api/team/logo?id=${props.match.participants[1]!.id}`}
                alt="league logo"
                fit="contain"
                mah={20}
                fallbackSrc="/place.svg"
              />
              <Text size="xs" w={120} tt="capitalize">
                {props.match.participants[1]!.name ?? "Unknown"}
              </Text>
            </Group>
          </Stack>

          <Stack gap={5}>
            <Text size="xs">{props.match.participants[0]!.score}</Text>

            <Text size="xs">{props.match.participants[1]!.score}</Text>
          </Stack>

          <Group>
            <Image
              src="https://cdn.discordapp.com/attachments/1192566850110898177/1192925149452836894/nYADQoBBHeOXRjBW1kFOra.png.png?ex=65aad91f&is=6598641f&hm=fb33c4462de67e31cff4ba38597fc84eb8af58417d1fb4c903ecaf0aeed7f01b&"
              alt="league logo"
              fit="contain"
              mah={30}
            />
            <Text size="xs" w={150}>
              {props.match.competition.name}
            </Text>
          </Group>

          {(() => {
            if (props.match.status === "Started") {
              return (
                <>
                  <Group>
                    <Box
                      style={{
                        backgroundColor: "var(--mantine-color-red-6)",
                        borderRadius: "50%",
                        width: "7px",
                        height: "7px",
                      }}
                    />

                    <Text size="xs">LIVE</Text>
                  </Group>
                </>
              );
            }

            if (props.match.status === "Scheduled") {
              return (
                <>
                  <Group>
                    <Box
                      style={{
                        backgroundColor: "var(--mantine-color-yellow-6)",
                        borderRadius: "50%",
                        width: "7px",
                        height: "7px",
                      }}
                    />

                    <Text size="xs">UPCOMING</Text>
                  </Group>
                </>
              );
            }

            return <></>;
          })()}

          <Text size="xs" c="blue">
            {NumTimeFormat(props.match.scheduledStartTime, "Mon, 14:00")}
          </Text>
        </Group>
      </Card>
    </>
  );
}
