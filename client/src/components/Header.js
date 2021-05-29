import React from 'react'
import { Header, Image ,Segment} from 'semantic-ui-react'

/*const HeaderEx = () => (
  <Header as='h2'>
    <Image circular src='../../public/images/ManipalFlatmatesLogo.png' /> Manipal Flatmates
  </Header>
)
*/
const HeaderEx = () => (
  <Segment clearing>
    <Header as='h2' floated='left'>
      Manipal Flatmates
    </Header>
    <Header as='h3' floated='right'>
    	Find your flatmate today!
    </Header>
  </Segment>
)

export default HeaderEx;


