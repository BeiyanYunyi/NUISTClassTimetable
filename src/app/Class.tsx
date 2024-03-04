import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FC } from 'react';

const Class: FC<{
  name: string;
  teacher: string;
  classroom: string;
  time: string;
  disabled?: boolean;
}> = ({ name, teacher, classroom, time, disabled }) => (
  <Card className={disabled ? 'text-stone-400' : ''}>
    <CardHeader>
      <CardTitle>{name}</CardTitle>
      <CardDescription>{teacher}</CardDescription>
    </CardHeader>
    <CardContent>
      <p>{classroom}</p>
      <p>{time}</p>
    </CardContent>
  </Card>
);

export default Class;
