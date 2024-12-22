import { Prop } from "@/data/components";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Separator } from "./ui/separator";

interface ComponentProps {
  props: Prop[];
}

export function ComponentProps({ props }: ComponentProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold text-primary">Props</h2>
        <Separator className="mt-2" />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Prop</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Default</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.map((prop) => (
            <TableRow key={prop.prop}>
              <TableCell className="font-medium">{prop.prop}</TableCell>
              <TableCell>{prop.type}</TableCell>
              <TableCell>{prop.default}</TableCell>
              <TableCell>{prop.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
