import React, { memo, useCallback, useMemo, useState } from 'react';
import styles from './Table.module.css';

export interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

export interface TableProps<T extends { id: string | number }> {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
  caption?: string;
  loading?: boolean;
}

type SortDir = 'asc' | 'desc' | null;

export const Table = memo(<T extends { id: string | number }>({ data, columns, pageSize = 10, caption, loading = false }: TableProps<T>) => {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [page, setPage] = useState(1);

  const handleSort = useCallback((key: keyof T) => {
    if (sortKey === key) {
      setSortDir((prev) => prev === 'asc' ? 'desc' : prev === 'desc' ? null : 'asc');
      if (sortDir === 'desc') setSortKey(null);
    } else { setSortKey(key); setSortDir('asc'); }
    setPage(1);
  }, [sortKey, sortDir]);

  const sorted = useMemo(() => {
    if (!sortKey || !sortDir) return data;
    return [...data].sort((a, b) => {
      const cmp = String(a[sortKey]).localeCompare(String(b[sortKey]), undefined, { numeric: true });
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [data, sortKey, sortDir]);

  const totalPages = Math.ceil(sorted.length / pageSize);
  const pageData = sorted.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className={styles.wrapper}>
      <div className={styles.tableContainer}>
        <table className={styles.table} aria-label={caption}>
          {caption && <caption className={styles.caption}>{caption}</caption>}
          <thead><tr>
            {columns.map((col) => (
              <th key={String(col.key)} scope="col"
                className={col.sortable ? styles.sortable : ''}
                onClick={col.sortable ? () => handleSort(col.key) : undefined}
                aria-sort={sortKey === col.key ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}>
                {col.label}
                {col.sortable && <span className={styles.sortIcon} aria-hidden>{sortKey === col.key ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ' ↕'}</span>}
              </th>
            ))}
          </tr></thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={columns.length} className={styles.empty}><span aria-live="polite">Loading...</span></td></tr>
            ) : pageData.length === 0 ? (
              <tr><td colSpan={columns.length} className={styles.empty}>No data available.</td></tr>
            ) : pageData.map((row) => (
              <tr key={row.id}>
                {columns.map((col) => (
                  <td key={String(col.key)}>{col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '')}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className={styles.pagination} role="navigation" aria-label="Table pagination">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} aria-label="Previous page">&lsaquo; Prev</button>
          <span>Page {page} of {totalPages}</span>
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} aria-label="Next page">Next &rsaquo;</button>
        </div>
      )}
    </div>
  );
}) as <T extends { id: string | number }>(props: TableProps<T>) => JSX.Element;
