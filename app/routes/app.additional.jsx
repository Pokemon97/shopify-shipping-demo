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
import { authenticate } from "../shopify.server";
import { checkIfCarrierExistByName } from "~/models/carrieres.demo";

const carrierName = "Shipping Rate Provider";

export async function loader({ request }) {
  const { admin, session } = await authenticate.admin(request);
  const carrierExist = await checkIfCarrierExistByName(session, admin.rest.resources, carrierName);
  
  return json({
    ENV: {
      SHOP: process.env.SHOP,
    },
    carrierExist: carrierExist
  });
}

export default function AdditionalPage() {
  const data = useLoaderData();
  return (
    <Page>
      <ui-title-bar title="Additional page" />
      <Layout>
        <Layout.Section>
          <Card>
            <VerticalStack gap="3">
              <Text as="p" variant="bodyMd">
                Shop: { data.ENV.SHOP }
              </Text>
              <Text as="p" variant="bodyMd">
              Shipping Rate Provider: { data.carrierExist ? 'Installed' : 'Not Installed' }
              </Text>
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
