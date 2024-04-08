import { PageContainer } from "../modules/shared/ui/page-container";
import { PageLayout } from "../modules/shared/ui/page-layout";
import { Header } from "../modules/shared/ui/header";
import { Button } from "@tremor/react";
import { RiArrowLeftLine } from "@remixicon/react";
import { Link } from "@tanstack/react-router";
import { AddMeasurement } from "../modules/metrics/add-measurement";

export function AddMeasurementPage() {
  return (
    <PageContainer>
      <PageLayout layout="narrow">
        <div>
          <Link to="/">
            <Button variant="light" icon={RiArrowLeftLine}>
              Back to Dashboard
            </Button>
          </Link>
          <Header>Add measurement</Header>
        </div>
        <AddMeasurement />
      </PageLayout>
    </PageContainer>
  );
}
