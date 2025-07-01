"use client";

// ===== IMPORTS =====
// TanStack Table - biblioteca moderna para tabelas
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  getSortedRowModel,
  SortingState,
  RowSelectionState,
} from "@tanstack/react-table";

// Framer Motion - animações suaves
import { motion } from "framer-motion";

// Componentes UI - usando o design system do portfolio
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// ===== COMPONENTES ADMIN - Paths corretos =====
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"; // ← Está na mesma pasta admin/components/ui/

import { Checkbox } from "./checkbox"; // ← Se existir na pasta admin
// OU se não tiver criado ainda:
// import { Checkbox } from "@/components/ui/checkbox";

import React from "react";

// ===== TIPOS =====
// Props da DataTable - genérica para qualquer tipo de dados
// ===== PROPS SIMPLIFICADAS =====
type DataTableProps<TData extends { id: string | number }, TValue> = {
  // Dados obrigatórios
  columns: ColumnDef<TData, TValue>[];
  data: TData[];

  // Paginação server-side
  totalCount?: number;
  page?: number;
  pageSize?: number;

  // Estados UI
  isLoading?: boolean;
  emptyMessage?: string;

  // Callbacks - comunicação com página parent
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;

  // Features opcionais
  enableSelection?: boolean;

  // ===== CALLBACKS PARA SELEÇÃO MÚLTIPLA =====
  onSelectionChange?: (selectedIds: string[]) => void;
  onBulkDelete?: (selectedIds: string[]) => Promise<void>;
};

// ===== COMPONENTE PRINCIPAL =====
export function DataTable<TData extends { id: string | number }, TValue>({
  // Props com valores padrão
  columns,
  data,
  totalCount = 0,
  page = 1,
  pageSize = 10,
  isLoading = false,
  emptyMessage = "Sem dados para mostrar.",

  // Callbacks opcionais
  onPageChange,
  onPageSizeChange,

  enableSelection = false,
  onSelectionChange,
  onBulkDelete,
}: DataTableProps<TData, TValue>) {
  // ===== ESTADOS LOCAIS =====
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  // ===== COLUNA DE SELEÇÃO =====
  // Adiciona checkboxes quando enableSelection = true
  const selectionColumn: ColumnDef<TData, TValue> = {
    id: "select",
    // Header checkbox - seleciona/deseleciona todos da página
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Selecionar todos"
      />
    ),
    // Cell checkbox - seleciona linha individual
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Selecionar linha"
      />
    ),
    enableSorting: false, // Checkboxes não ordenam
    enableHiding: false, // Sempre visível
  };

  // ===== COLUNAS FINAIS =====
  // Adiciona coluna de seleção se habilitada
  const finalColumns = enableSelection
    ? [selectionColumn, ...columns]
    : columns;

  // ===== CONFIGURAÇÃO DA TABELA =====
  const table = useReactTable({
    data,
    columns: finalColumns,
    state: { sorting, rowSelection }, // Estados controlados
    onSortingChange: setSorting, // Callbacks de estado
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(), // Modelos necessários
    getSortedRowModel: getSortedRowModel(),
    enableRowSelection: enableSelection,
    getRowId: (row) => String(row.id), // ID único para cada linha
    manualPagination: true, // Paginação server-side
    pageCount: Math.ceil(totalCount / pageSize), // Total de páginas
  });

  // ===== DADOS DERIVADOS - NECESSÁRIOS PARA SELEÇÃO =====
  const selectedIds = table
    .getSelectedRowModel()
    .rows.map((row) => String(row.original.id));

  const totalPages = Math.ceil(totalCount / pageSize);
  const hasSelection = selectedIds.length > 0;

  // ===== EFEITO PARA NOTIFICAR MUDANÇAS DE SELEÇÃO =====
  React.useEffect(() => {
    onSelectionChange?.(selectedIds);
  }, [selectedIds, onSelectionChange]);

  // ===== HANDLERS =====
  const handleBulkDelete = async () => {
    if (selectedIds.length > 0 && onBulkDelete) {
      await onBulkDelete(selectedIds);
      setRowSelection({}); // Limpa seleção após eliminar
    }
  };

  // ===== SKELETON LOADING =====
  // Mostra linhas animadas durante carregamento (mais moderno que overlay)
  const SkeletonRows = () => (
    <>
      {Array.from({ length: pageSize }).map((_, i) => (
        <motion.tr
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.05 }} // Stagger effect
          className="border-b border-border"
        >
          {finalColumns.map((_, j) => (
            <td key={j} className="px-6 py-4">
              {/* Placeholder animado */}
              <div className="h-4 bg-muted animate-pulse rounded-md"></div>
            </td>
          ))}
        </motion.tr>
      ))}
    </>
  );

  // ===== RENDER =====
  return (
    <div className="space-y-4">
      {/* ===== BULK ACTIONS BAR (quando há seleção) ===== */}
      {hasSelection && enableSelection && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
              {selectedIds.length}{" "}
              {selectedIds.length === 1
                ? "item selecionado"
                : "itens selecionados"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setRowSelection({})}
            >
              Limpar Seleção
            </Button>

            {onBulkDelete && (
              <Button
                variant="destructive"
                size="sm"
                onClick={handleBulkDelete}
                disabled={isLoading}
              >
                Eliminar Selecionados
              </Button>
            )}
          </div>
        </motion.div>
      )}

      {/* ===== TABELA PRINCIPAL ===== */}
      <Card className="border shadow-sm">
        <div className="overflow-x-auto">
          {/* ===== TABLE HTML NATIVA ===== */}
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b bg-muted/50">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody className="[&_tr:last-child]:border-0">
              {isLoading ? (
                // ===== SKELETON LOADING ROWS =====
                <SkeletonRows />
              ) : table.getRowModel().rows?.length ? (
                // ===== DATA ROWS =====
                table.getRowModel().rows.map((row, index) => (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    data-state={row.getIsSelected() && "selected"}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="p-4 align-middle">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </motion.tr>
                ))
              ) : (
                // ===== EMPTY STATE =====
                <tr>
                  <td
                    colSpan={finalColumns.length}
                    className="h-32 text-center text-muted-foreground p-4"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className="text-4xl opacity-50">📄</div>
                      <div>{emptyMessage}</div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ===== PAGINATION COMPLETA ===== */}
        {totalCount > 0 && (
          <div className="flex items-center justify-between px-4 py-3 border-t bg-muted/20">
            {/* ===== INFO DA PAGINAÇÃO ===== */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>
                Mostrando {Math.min((page - 1) * pageSize + 1, totalCount)} a{" "}
                {Math.min(page * pageSize, totalCount)} de {totalCount} registos
              </span>

              {hasSelection && (
                <span className="text-blue-600 dark:text-blue-400">
                  • {selectedIds.length} selecionados
                </span>
              )}
            </div>

            {/* ===== CONTROLOS DA PAGINAÇÃO ===== */}
            <div className="flex items-center gap-2">
              {/* Page Size Selector */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Linhas:</span>
                <Select
                  value={pageSize.toString()}
                  onValueChange={(value) => onPageSizeChange?.(Number(value))}
                >
                  <SelectTrigger className="w-[70px] h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange?.(1)}
                  disabled={page <= 1}
                  className="h-8"
                >
                  ««
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange?.(page - 1)}
                  disabled={page <= 1}
                  className="h-8"
                >
                  ‹ Anterior
                </Button>

                <span className="text-sm px-3">
                  {page} de {totalPages}
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange?.(page + 1)}
                  disabled={page >= totalPages}
                  className="h-8"
                >
                  Próximo ›
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPageChange?.(totalPages)}
                  disabled={page >= totalPages}
                  className="h-8"
                >
                  »»
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
