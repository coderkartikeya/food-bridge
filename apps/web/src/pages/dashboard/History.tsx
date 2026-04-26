import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Heading, Button, Icon, Badge } from "@components/export/index";
import StatCard from "../../stories/molecule/StatCard/StatCard";
import Table, { type ColumnDef } from "../../stories/organism/table/Table";
import { DashboardService, type HistoryItem } from "../../services/services/dashboard-service";
import { type RootState } from "../../store";

const History = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    DashboardService.getHistory().then(data => {
      setHistoryData(data);
      setLoading(false);
    });
  }, []);

  const columns: ColumnDef<HistoryItem>[] = [
    { key: "date", header: "Date" },
    { key: "restaurant", header: "Restaurant (Pickup)", render: (row) => <span className="font-bold text-gray-900">{row.restaurant}</span> },
    { key: "shelter", header: "Shelter (Drop-Off)" },
    { key: "items", header: "Items Rescued" },
    { key: "time", header: "Time Taken" },
    { 
      key: "status", 
      header: "Status", 
      render: (row) => <Badge badgeType={row.status === "Delivered" ? "success" : "neutral"}>{row.status}</Badge> 
    },
    {
      key: "actions",
      header: "Actions",
      render: () => (
        <span className="text-gray-400 hover:text-brand-primary cursor-pointer transition-colors block text-right">
          <Icon name="fileText" size={20} />
        </span>
      )
    }
  ];

  if (loading) return <div className="text-gray-400 text-center py-20 font-bold">Loading history...</div>;

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-8 animate-in fade-in zoom-in duration-500">
      
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Heading headingType="h2" className="text-2xl font-bold text-gray-900 tracking-tight">
          {user?.role === "DONOR" ? "Donation History" : "My Delivery History"}
        </Heading>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="bg-white border rounded-xl shadow-sm text-sm font-semibold text-gray-700 px-4 py-2.5 flex items-center justify-between w-40 cursor-pointer hover:bg-gray-50 border-gray-200">
            Last 30 Days
            <Icon name="chevronDown" size={16} />
          </div>
          <Button buttonType="secondary" className="gap-2 bg-white flex-1 sm:flex-auto py-2.5 shadow-sm border-gray-200 hover:bg-gray-50">
            <Icon name="file" size={16} />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard 
          title={user?.role === "DONOR" ? "Total Listed Donations" : "Total Completed Deliveries"}
          value={historyData.length}
          trend="Latest"
          icon="check"
        />
        <StatCard 
          title={user?.role === "DONOR" ? "Pending Donation Events" : "Pending Delivery Events"}
          value={historyData.filter((item) => item.status === "Pending").length}
          icon="mapPin"
          trendVariant="neutral"
        />
      </div>

      {/* History Data Table rendered via scalable organism Component */}
      <Table 
        data={historyData} 
        columns={columns} 
        totalEntries={historyData.length}
        currentPage={currentPage}
        entriesPerPage={5}
        onPageChange={setCurrentPage}
      />
      
    </div>
  );
};

export default History;
