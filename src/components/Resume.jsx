/* eslint-disable react/prop-types */
import Section from './Section';
import './resume.css';

const Resume = ({ data }) => {
	return (
		<div id='resume__container'>
			<div id='resume'>
				<div className='row'>
					<div className='personal-info'>
						<p className='name'>
							{data.firstName}
							<br />
							{data.lastName}
						</p>
						<p className='job-position theme-text'>{data.position}</p>
					</div>
					<div className='contact_info'>
						<div className='contact'>
							<p className='theme-text job-position special-section__name large '>
								Contacts
							</p>
							{/*todo- change the job position styling */}
							<div className='x-small bold'>
								<p>{data.contact.address}</p>
								<p>{data.contact.email}</p>
								<p>{data.contact.phone}</p>
							</div>
						</div>
						<div className='links '>
							<p className='theme-text job-position special-section__name large'>
								Links
							</p>
							<div className='x-small normal'>
								{data.links.map((link, index) => (
									<p key={index}>{link}</p>
								))}
							</div>
						</div>
					</div>
				</div>

				<div className='col_container'>
					<div className='column'>
						{/* About me section */}
						<Section name='About'>
							<p className='x-small normal'>{data.about}</p>
						</Section>

						{/* Languages Section */}
						<Section name={data.sections[0].name}>
							<div>
								{data.sections[0].languages.map((language) => (
									<div
										className='language-container'
										key={language.name}
									>
										<p className='medium bold'>{language.name}</p>
										<p className='x-small normal italic theme-text capitalise'>
											{language.proficiency}
										</p>
									</div>
								))}
							</div>
						</Section>

						{/* Skills */}
						<Section name={data.sections[1].name}>
							<div>
								{data.sections[1].skills.map((skill, index) => (
									<p
										className='medium normal capitalise'
										key={index}
									>
										{skill}
									</p>
								))}
							</div>
						</Section>

						{/* Interests Section */}
						<Section name={data.sections[2].name}>
							<div className='medium normal capitalise'>
								{data.sections[2].interests.map((interest, index) => (
									<p key={index}>{interest}</p>
								))}
							</div>
						</Section>
					</div>
					<div className='column'>
						{/* Education Section */}
						<Section name={data.sections[3].name}>
							<div className='data-container'>
								{data.sections[3].education.map((ed) => (
									<div
										className='inner row'
										key={ed.start}
									>
										<div>
											<p className='medium bold capitalise'>{ed.place}</p>
											<p className='x-small normal theme-text italic'>
												{ed.start} - {ed.end}
											</p>
										</div>
										<div>
											<p className='small normal capitalise'>{ed.degree}</p>
										</div>
									</div>
								))}
							</div>
						</Section>

						{/* Experience Section */}
						<Section name={data.sections[4].name}>
							<div className='data-container'>
								{data.sections[4].experience.map((exp) => (
									<div
										className='inner row'
										key={exp.start}
									>
										<div>
											<p className='medium bold capitalise'>{exp.company}</p>
											<p className='x-small normal theme-text italic'>
												{exp.start} - {exp.end}
											</p>
										</div>
										<div>
											<p className='small normal'>{exp.about}</p>
										</div>
									</div>
								))}
							</div>
						</Section>

						{/* Achievements Section */}
						<Section name={data.sections[5].name}>
							<div className='data-container'>
								{data.sections[5].achievements.map((achvt) => (
									<div
										className='inner row'
										key={achvt.year}
									>
										<div>
											<p className='medium bold capitalise'>
												{achvt.achievement}
											</p>
											<p className='x-small normal theme-text italic'>
												{achvt.year} - {achvt.place}
											</p>
										</div>
										<div>
											<p className='small normal'>{achvt.about}</p>
										</div>
									</div>
								))}
							</div>
						</Section>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Resume;
