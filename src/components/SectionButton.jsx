const SectionButton = ({ icon, onPress }) => {
	return (
		<>
			<button onClick={onPress}>
				<img src={icon} />
			</button>
		</>
	);
};

export default SectionButton;
