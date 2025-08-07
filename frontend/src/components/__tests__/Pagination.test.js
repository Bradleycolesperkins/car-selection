import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../Pagination';

test('renders pagination controls', () => {
    render(<Pagination page={2} totalPages={5} onPageChange={jest.fn()} />);
    expect(screen.getByText('Page 2 of 5')).toBeInTheDocument();
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
});

test('disables Previous button on first page', () => {
    render(<Pagination page={1} totalPages={5} onPageChange={jest.fn()} />);
    expect(screen.getByText('Previous')).toBeDisabled();
    expect(screen.getByText('Next')).not.toBeDisabled();
});

test('disables Next button on last page', () => {
    render(<Pagination page={5} totalPages={5} onPageChange={jest.fn()} />);
    expect(screen.getByText('Previous')).not.toBeDisabled();
    expect(screen.getByText('Next')).toBeDisabled();
});

test('calls onPageChange when buttons are clicked', () => {
    const onPageChange = jest.fn();
    render(<Pagination page={2} totalPages={5} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByText('Previous'));
    expect(onPageChange).toHaveBeenCalledWith(1);
    fireEvent.click(screen.getByText('Next'));
    expect(onPageChange).toHaveBeenCalledWith(3);
});