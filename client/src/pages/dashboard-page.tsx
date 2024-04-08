import { Button } from "@tremor/react";
import { Link } from "@tanstack/react-router";
import { RiAddLine } from "@remixicon/react";
import { Header } from "../modules/shared/ui/header";
import { MetricsChart } from "../modules/metrics/metrics-chart";
import { PageContainer } from "../modules/shared/ui/page-container";
import { PageLayout } from "../modules/shared/ui/page-layout";

export function DashboardPage() {
  return (
    <PageContainer>
      <PageLayout layout="wide">
        <div className="flex justify-between items-end">
          <Header>Dashboard</Header>
          <Link to="/create">
            <Button className="self-end" variant="secondary" icon={RiAddLine}>
              Add measurement
            </Button>
          </Link>
        </div>
        <MetricsChart />
      </PageLayout>
    </PageContainer>
  );
}
