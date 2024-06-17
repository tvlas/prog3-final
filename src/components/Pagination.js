import { Box, Button, ButtonGroup } from "@chakra-ui/react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleClick = (page) => {
    if (page === "..." || page < 1 || page > totalPages) return;
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box mt="4" textAlign="center">
      <ButtonGroup spacing="2">
        <Button onClick={() => handleClick(1)} disabled={currentPage === 1}>
          First
        </Button>
        <Button
          onClick={() => handleClick(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </Button>
        {currentPage > 2 && (
          <Button onClick={() => handleClick(currentPage - 2)}>
            {currentPage - 2}
          </Button>
        )}
        {currentPage > 1 && (
          <Button onClick={() => handleClick(currentPage - 1)}>
            {currentPage - 1}
          </Button>
        )}
        <Button
          onClick={() => handleClick(currentPage)}
          variant="outline"
          colorScheme="blue"
        >
          {currentPage}
        </Button>
        {currentPage < totalPages && (
          <Button onClick={() => handleClick(currentPage + 1)}>
            {currentPage + 1}
          </Button>
        )}
        {currentPage < totalPages - 1 && (
          <Button onClick={() => handleClick(currentPage + 2)}>
            {currentPage + 2}
          </Button>
        )}
        <Button
          onClick={() => handleClick(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
        <Button
          onClick={() => handleClick(totalPages)}
          disabled={currentPage === totalPages}
        >
          Last
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default Pagination;
