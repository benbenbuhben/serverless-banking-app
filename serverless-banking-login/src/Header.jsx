import { Heading, Flex } from '@aws-amplify/ui-react';

function Header() {
  return (
    <Flex as="header" justifyContent="center" alignItems="center" padding="20px" backgroundColor="#f7f7f7">
      <Heading level={1}>CityU Bank</Heading>
    </Flex>
  );
}

export default Header;
