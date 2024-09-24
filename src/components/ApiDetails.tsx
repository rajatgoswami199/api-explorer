import styled from 'styled-components';
interface ApiDetailsProps {
  details: any;
}
const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  color: #fff;
`;

const Title = styled.h1`
  display: flex;
  align-items: center;
  font-size: 2em;
`;

const Logo = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 20px;
`;

const Description = styled.p`
  font-size: 1.2em;
  color: #fff;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 1.5em;
  margin-top: 20px;
`;

const ContactInfo = styled.div`
  font-size: 1em;
  margin-top: 10px;

  a {
    color: #fff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
function ApiDetails({ details }: ApiDetailsProps) {
    const { info, swaggerUrl, swaggerYamlUrl } = details;
    const { title, description, contact, "x-logo": xLogo } = info;
  return (
    <PageContainer>
      <Title>
        <Logo src={xLogo.url} alt={title} />
        {title}
      </Title>
      <SectionTitle>Description</SectionTitle>
      <Description>{description}</Description>

      <SectionTitle>Swagger</SectionTitle>
      <Description>{swaggerUrl}</Description>
      <SectionTitle>Contact</SectionTitle>
      <ContactInfo>
        <p>Name: {contact.name}</p>
        <p>Email: <a href={`mailto:${contact.email}`}>{contact.email}</a></p>
        <p>url: <a href={contact.url} target="_blank" rel="noopener noreferrer">{contact.url}</a></p>
      </ContactInfo>
    </PageContainer>
  );
}

export default ApiDetails;
