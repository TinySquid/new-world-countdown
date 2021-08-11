import { useEffect, useRef } from "react";

function BackgroundSelector() {
	const bg1Ref = useRef();
	const bg2Ref = useRef();
	const bg3Ref = useRef();

	useEffect(() => {
		const choice = Math.floor(Math.random() * 3);

		switch (choice) {
			case 0:
				bg1Ref.current.style.display = "block";
				break;
			case 1:
				bg2Ref.current.style.display = "block";
				break;
			case 2:
				bg3Ref.current.style.display = "block";
				break;
			default:
				bg1Ref.current.style.display = "block";
				break;
		}
	}, []);

	return (
		<>
			<img id="background-1" ref={bg1Ref} />
			<img id="background-2" ref={bg2Ref} />
			<img id="background-3" ref={bg3Ref} />
		</>
	);
}

export default BackgroundSelector;
