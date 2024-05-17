/* eslint-disable no-mixed-spaces-and-tabs */
import { metaidService } from "../../utils/api";
import { Center, Container, Loader, Text, Image, Button, Modal, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { networkAtom } from "../../store/user";
import { useRecoilValue } from "recoil";
import dayjs from "dayjs";

type Iprops = {
	id: string;
};

const PinDetail = ({ id }: Iprops) => {
	const network = useRecoilValue(networkAtom);
	const { data, isError, isLoading } = useQuery({
		queryKey: ["pin", "detail", id],
		queryFn: () => metaidService.getPinDetail({ id }, network),
	});
	const [viewMoreOpened, viewMoreHandler] = useDisclosure(false);

	return (
		<>
			{isError ? (
				"Server error"
			) : isLoading ? (
				<Center className="h-[666px]">
					<Loader type="bars" />
				</Center>
			) : (
				<div className="flex flex-col gap-4">
					<Text c={"blue"} size={"xl"}>
						{data?.contentTypeDetect}
					</Text>
					{data?.operation === "init" ? null : !data?.contentTypeDetect.includes(
							"image"
					  ) ? (
						<div className="flex flex-col gap-2">
							<Container
								h={200}
								w={"100%"}
								bg={"var(--mantine-color-blue-light)"}
								className={"rounded-md grid place-items-center overflow-hidden"}
							>
								<p className="text-wrap break-all">
									{`${data?.contentSummary ?? ""}${
										(data?.contentSummary ?? "").length > 1900 ? "..." : ""
									}`}
								</p>
							</Container>

							{(data?.contentSummary ?? "").length > 1900 && (
								<Container w={"100%"} className={"rounded-md grid place-items-end"}>
									<Button
										onClick={viewMoreHandler.open}
										variant="light"
										size="xs"
										className="mr-[-16px]"
									>
										View More
									</Button>
								</Container>
							)}
						</div>
					) : (
						<Container
							h={200}
							w={"100%"}
							bg={"var(--mantine-color-blue-light)"}
							className={"rounded-md grid place-items-center"}
						>
							<Image
								src={data?.content}
								alt="image"
								h={100}
								w="auto"
								fit="contain"
								fallbackSrc={data?.content}
							/>
						</Container>
					)}
					<div className="flex gap-2 items-center">
						<Text className="text-slate-400 italic">id:</Text>
						<Text>{data?.id}</Text>
					</div>
					<div className="flex gap-2 items-center">
						<Text className="text-slate-400 italic">PoP:</Text>
						<Text>{data?.pop.slice(0, 8) + "..." + data?.pop.slice(-8, -1)}</Text>
						<Tooltip label={data?.pop}>
							<Button variant="subtle" size="xs">
								Show Full
							</Button>
						</Tooltip>
					</div>
					<div className="flex gap-2 items-center">
						<Text className="text-slate-400 italic">MetaID:</Text>
						<Text>{data?.metaid}</Text>
					</div>
					<div className="flex gap-2 items-center">
						<Text className="text-slate-400 italic">address:</Text>
						<Text>{data?.address}</Text>
					</div>
					<div className="flex gap-2 items-center">
						<Text className="text-slate-400 italic">operation:</Text>
						<Text>{data?.operation}</Text>
					</div>
					<div className="flex gap-2 items-center">
						<Text className="text-slate-400 italic">path:</Text>
						<Text>{data?.path}</Text>
					</div>
					<div className="flex gap-2 items-center">
						<Text className="text-slate-400 italic">originalPath:</Text>
						<Text>{data?.originalPath}</Text>
					</div>
					<div className="flex gap-2 items-center">
						<Text className="text-slate-400 italic">version:</Text>
						<Text>{data?.version}</Text>
					</div>
					<div className="flex gap-2 items-center">
						<Text className="text-slate-400 italic">encryption:</Text>
						<Text>{data?.encryption}</Text>
					</div>
					<div className="flex gap-2 items-center">
						<Text className="text-slate-400 italic">output value:</Text>
						<Text>{data?.outputValue}</Text>
					</div>
					<div className="flex gap-2 items-center">
						<Text className="text-slate-400 italic">preview:</Text>
						<Text
							className="underline cursor-pointer"
							onClick={() => {
								window.open(data?.preview, "_blank");
							}}
						>
							{data?.preview}
						</Text>
					</div>
					<div className="flex gap-2 items-center">
						<Text className="text-slate-400 italic">content:</Text>
						<Text
							className="underline cursor-pointer"
							onClick={() => {
								window.open(data?.content, "_blank");
							}}
						>
							{data?.content}
						</Text>
					</div>
					<div className="flex gap-2 items-center">
						<Text className="text-slate-400 italic">content length:</Text>
						<Text>{data?.contentLength}</Text>
					</div>
					<div className="flex gap-2 items-center">
						<Text className="text-slate-400 italic">content type:</Text>
						<Text>{data?.contentType}</Text>
					</div>
					<div className="flex gap-2 items-center">
						<Text className="text-slate-400 italic">UTC time:</Text>
						<Text>
							{dayjs
								.unix(data?.timestamp ?? dayjs().valueOf())
								.format("YYYY-MM-DD HH:mm:ss")}
						</Text>
					</div>
					<div className="flex gap-2 items-center">
						<Text className="text-slate-400 italic">geneis height:</Text>
						<Text>{data?.genesisHeight}</Text>
					</div>
					<div className="flex gap-2 items-center">
						<Text className="text-slate-400 italic">geneis transaction:</Text>
						<Text>{data?.genesisTransaction}</Text>
					</div>
				</div>
			)}
			<Modal opened={viewMoreOpened} onClose={viewMoreHandler.close} size="lg">
				{data?.operation === "init" ? null : !data?.contentTypeDetect.includes("image") ? (
					<div className="flex flex-col gap-2">
						<Container
							// h={200}
							w={"100%"}
							bg={"var(--mantine-color-blue-light)"}
							className={"rounded-md grid place-items-center"}
						>
							<p className="break-all text-wrap">{data?.contentSummary ?? ""}</p>
						</Container>
					</div>
				) : (
					<Container
						// h={200}
						w={"100%"}
						bg={"var(--mantine-color-blue-light)"}
						className={"rounded-md grid place-items-center"}
					>
						<Image
							src={data?.content}
							alt="image"
							h={100}
							w="auto"
							fit="contain"
							fallbackSrc={data?.content}
						/>
					</Container>
				)}
			</Modal>
		</>
	);
};

export default PinDetail;
