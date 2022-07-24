import { CreatePage } from ".";
import { retrieveReadme } from '../sections/About';

const About = CreatePage("about");
About.getInitialProps = async (): Promise<{}> => {
    const props: { [index: string]: any } = {};

    props.data = await retrieveReadme();

    return props;
};
export default About