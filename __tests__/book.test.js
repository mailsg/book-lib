const request = require('supertest');
const app = require('../app'); 

describe('Book API', () => {
    // Test data for creating a new book
    const newBookData = {
        title: 'Test Book',
        author: 'Test Author',
        publication_year: '2022',
    };

    // Variable to store the ID of the created book
    let createdBookId;

    // Test the POST /books endpoint
    describe('POST /books', () => {
        it('should create a new book', async () => {
            
            const response = await request(app)
                .post('/books')
                .send(newBookData)
                .expect(201);

            // Ensure the response contains the created book
            expect(response.body.title).toBe(newBookData.title);
            expect(response.body.author).toBe(newBookData.author);
            expect(response.body.publication_year).toBe(newBookData.publication_year);

            // Store the created book ID for later use
            createdBookId = response.body._id;
        
        }, 10000);        
    });

    // Test the GET /books endpoint
    describe('GET /books', () => {
        it('should get all books', async () => {
            const response = await request(app).get('/books').expect(200);

            // Ensure the response is an array
            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    // Test the GET /books/:id endpoint
    describe('GET /books/:id', () => {
        it('should get a book by ID', async () => {
            // Skip the test if no created book ID is available
            if (!createdBookId) {
                return;
            }
        
            const response = await request(app)
                .get(`/books/${createdBookId}`)
                .expect(200);

            if (response.body) {
                expect(response.body._id).toBe(newBookData._id);
                expect(response.body.title).toBe(newBookData.title);
                expect(response.body.author).toBe(newBookData.author);
                expect(response.body.publication_year).toBe(newBookData.publication_year);
            }
        });
    });

    // Test the DELETE /books/:id endpoint
    describe('DELETE /books/:id', () => {
        it('should delete a book by ID', async () => {
            // Skip the test if no created book ID is available
            if (!createdBookId) {
                return;
            }
        
            const response = await request(app)
                .delete(`/books/${createdBookId}`)
                .expect(200);

            expect(response.body.message).toBe('Book deleted successfully');
        });
    });
});
