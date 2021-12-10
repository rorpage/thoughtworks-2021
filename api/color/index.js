import { createClient } from 'redis';

export default async (req, res) => {
  const { body } = req;

  let response = { color: '#336699' };

  const time_to_live = 900;
  const key = 'thoughtworks';
  const host = process.env.REDIS_URL || 'redis://localhost:6379';

  const redis_client = createClient({ url: host });

  redis_client.on('error', (err) => {
    console.log(`Error ${err}`);
  });

  await redis_client.connect();

  if (body) {
    response.color = body;

    await redis_client.setEx(key, time_to_live, JSON.stringify(response))
  } else {
    const redis_data = await redis_client.get(key);

    if (redis_data === null) {
      await redis_client.setEx(key, time_to_live, JSON.stringify(response));
    } else {
      response = JSON.parse(redis_data);
    }
  }

  redis_client.quit();

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );

  res.json(response);
};
