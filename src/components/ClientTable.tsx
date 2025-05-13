import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Client } from '@/types';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Table2 } from 'lucide-react';

interface ClientTableProps {
  clients: Client[];
}

export function ClientTable({ clients }: ClientTableProps) {
  const formatDate = (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatDateTime = (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <Table>
      <TableHeader className='bg-gray-50'>
        <TableRow>
          <TableHead>
            <Table2 size={20} color='oklch(.556 0 0)' />
          </TableHead>
          <TableHead className='w-[80px] text-muted-foreground font-semibold'>
            Client ID
          </TableHead>
          <TableHead className='text-muted-foreground font-semibold'>
            Client Name
          </TableHead>
          <TableHead className='text-muted-foreground font-semibold'>
            Client Type
          </TableHead>
          <TableHead className='text-muted-foreground font-semibold'>
            Email
          </TableHead>
          <TableHead className='text-muted-foreground font-semibold'>
            Status
          </TableHead>
          <TableHead className='text-muted-foreground font-semibold'>
            Created At
          </TableHead>
          <TableHead className='text-muted-foreground font-semibold'>
            Updated At
          </TableHead>
          <TableHead className='text-muted-foreground font-semibold'>
            Updated By
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients.length > 0 ? (
          clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell />
              <TableCell className='font-medium text-blue-500'>
                {client.client_id_numeric}
              </TableCell>
              <TableCell>{client.name}</TableCell>
              <TableCell>{client.type}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>
                <Badge
                  variant={client.status === 'Active' ? 'default' : 'outline'}
                  className={cn(
                    client.status === 'Active'
                      ? 'text-green-500 bg-green-100'
                      : 'text-red-400 bg-red-100',
                    'flex items-center gap-2'
                  )}
                >
                  <span className='bg-green-500 h-1 w-1 rounded-full' />
                  {client.status}
                </Badge>
              </TableCell>
              <TableCell>{formatDate(client.createdAt)}</TableCell>
              <TableCell>{formatDateTime(client.updatedAt)}</TableCell>
              <TableCell>{client.updatedBy}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={8} className='h-24 text-center'>
              No clients found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
