import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  console.log('Seeding Database Dude ....');

  const product1 = await prisma.products.create({
    data: {
      title: 'Kebaya',
      photo:
        'https://res.cloudinary.com/dgquproum/image/upload/v1763630448/kebaya-akad_fykjea.jpg',
      description:
        'A beautifully crafted traditional kebaya made from premium lace and soft inner lining. Designed with elegant floral patterns, this kebaya offers a graceful silhouette perfect for formal events, weddings, and cultural ceremonies. The breathable material ensures comfort, while the intricate embroidery highlights a timeless Indonesian heritage look.',
      quantity: 10,
      created_at: new Date('2022-08-01T08:10:00Z'),
      updated_at: new Date('2022-08-01T08:10:00Z'),
      reviews: {
        create: [
          {
            name: 'Sarah',
            ratings: 5,
            comments: 'The lace quality is amazing!',
            created_at: new Date('2024-11-01T08:10:00Z'),
          },
          {
            name: 'Michelle',
            ratings: 4,
            comments:
              'Beautiful design and very comfortable to wear. The color was slightly lighter than the photo, but still gorgeous.',
            created_at: new Date('2024-11-01T10:25:00Z'),
          },
          {
            name: 'Yodha',
            ratings: 5,
            comments:
              'I like the design, It looks elegant and fits perfectly. I wore it to a wedding and received so many compliments.',
            created_at: new Date('2024-11-02T12:40:00Z'),
          },
          {
            name: 'Diana',
            ratings: 3,
            comments:
              'The kebaya is nice, but the inner lining could be thicker. Still, the overall look is stunning.',
            created_at: new Date('2024-11-03T09:15:00Z'),
          },
          {
            name: 'Clara',
            ratings: 5,
            comments:
              'Elegant and fits well on the body. Great for formal events. I love the traditional vibe with a modern touch.',
            created_at: new Date('2025-11-03T13:05:00Z'),
          },
        ],
      },
    },
  });

  const product2 = await prisma.products.create({
    data: {
      title: 'Cosplay Ultraman Costume',
      photo:
        'https://res.cloudinary.com/dgquproum/image/upload/v1763630448/baju-cosplay-ultraman_ipqytp.jpg',
      description:
        'A high-quality Ultraman cosplay suit made from flexible spandex material for maximum mobility and comfort. Designed with accurate character detailing, vibrant colors, and a sleek body fit, this costume is perfect for conventions, photo shoots, cosplay events, or themed performances. Durable, breathable, and stretchable, it gives you the authentic Ultraman look while allowing comfortable wear for long hours.',
      quantity: 3,
      created_at: new Date('2022-08-01T08:10:00Z'),
      updated_at: new Date('2022-08-01T08:10:00Z'),
      reviews: {
        create: [
          {
            name: 'Ken',
            ratings: 5,
            comments:
              'The costume looks exactly like the real Ultraman! Great material and very comfortable to move around in.',
            created_at: new Date('2024-11-05T07:50:00Z'),
          },
          {
            name: 'Yuki',
            ratings: 4,
            comments:
              'Awesome detail and bright colors. It fits well, although the zipper could be a little stronger.',
            created_at: new Date('2024-11-05T09:22:00Z'),
          },
          {
            name: 'Ethan',
            ratings: 3,
            comments:
              'Good quality overall, but the fabric gets warm after long wear. Still great for short events.',
            created_at: new Date('2024-11-06T11:10:00Z'),
          },
          {
            name: 'Marco',
            ratings: 5,
            comments:
              'Perfect for cosplay events! I wore it for a photoshoot and the suit looked amazing on camera.',
            created_at: new Date('2024-11-06T14:45:00Z'),
          },
          {
            name: 'Leo',
            ratings: 4,
            comments:
              'Very authentic design. The stretch is nice and the suit is flexible. Great value for Ultraman fans!',
            created_at: new Date('2024-11-07T06:55:00Z'),
          },
        ],
      },
    },
  });

  console.log('Seed Completed Dude!');
  console.log(`Product: ${product1.title}, ${product2.title}`);
}
main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
