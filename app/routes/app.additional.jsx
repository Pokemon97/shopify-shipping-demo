import {
  Box,
  Card,
  Layout,
  Link,
  List,
  Page,
  Text,
  VerticalStack,
} from "@shopify/polaris";
import { json } from "@remix-run/node";
import { useLoaderData} from "@remix-run/react";
import { getListCarrieres, checkExistByName }  from "../models/carrieres.demo"

export async function loader() {
  const listCarriers = await getListCarrieres();
  const test =  await checkExistByName('Shipping Rate Provider');
  
  return json({
    ENV: {
      SHOP: process.env.SHOP,
    },
    carriers: listCarriers,
    exist: test
  });
}

export default function AdditionalPage() {
  const data = useLoaderData();
  console.log('----------------------------');
  console.log(data.carriers);
  console.log(data.exist);
  return (
    <Page>
      <ui-title-bar title="Additional page" />
      <Layout>
        <Layout.Section>
          <Card>
            <VerticalStack gap="3">
              <Text as="p" variant="bodyMd">
                The app template comes with an additional page which
                demonstrates how to create multiple pages within app navigation
                using{" "}
                <Link
                  url="https://shopify.dev/docs/apps/tools/app-bridge"
                  target="_blank"
                >
                  App Bridge
                </Link>
                .
              </Text>
              <Text as="p" variant="bodyMd">
                To create your own page and have it show up in the app
                navigation, add a page inside <Code>app/routes</Code>, and a
                link to it in the <Code>&lt;ui-nav-menu&gt;</Code> component
                found in <Code>app/routes/app.jsx</Code>.
              </Text>
              <Text as="p" variant="bodyMd">
                Shop: { data.ENV.SHOP }
              </Text>
            </VerticalStack>
          </Card>
        </Layout.Section>
        <Layout.Section secondary>
          <Card>
            <VerticalStack gap="2">
              <Text as="h2" variant="headingMd">
                Resources
              </Text>
              <List spacing="extraTight">
                <List.Item>
                  <Link
                    url="https://shopify.dev/docs/apps/design-guidelines/navigation#app-nav"
                    target="_blank"
                  >
                    App nav best practices
                  </Link>
                </List.Item>
              </List>
            </VerticalStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

function Code({ children }) {
  return (
    <Box
      as="span"
      padding="025"
      paddingInlineStart="1"
      paddingInlineEnd="1"
      background="bg-subdued"
      borderWidth="1"
      borderColor="border"
      borderRadius="1"
    >
      <code>{children}</code>
    </Box>
  );
}
