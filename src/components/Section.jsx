/* eslint-disable react/prop-types */
const ResumeSection = ({ name, children }) => {
	return (
		<div className='section'>
			<p className='section__name'>{name}</p>
			{children}
		</div>
	);
};
	
export default ResumeSection;
